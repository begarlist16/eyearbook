// ============================================================
//  Begarlist 16 — Ebook Reader Logic
// ============================================================

// ── STATE ────────────────────────────────────────────────────
let currentSpread   = 0;   // index of left page (0-based)
let isSinglePage    = false;
let zoomLevel       = 1.0;
let isFullscreen    = false;
let searchDebounce  = null;

// Pan state
let panX = 0, panY = 0;
let isPanning = false;
let panStartX = 0, panStartY = 0;
let panOriginX = 0, panOriginY = 0;

// Image cache: key = page src, value = HTMLImageElement (loaded)
const imageCache = new Map();

// Animation lock
let isAnimating = false;
let _jumpTarget = null; // used by jumpToPage to override flip destination

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('bg16-theme') || 'dark';
  setTheme(saved);

  document.getElementById('bookTitleText').textContent = BOOK.title;
  document.title = BOOK.title + ' — Ebook Reader';
  document.getElementById('pageTotal').textContent = PAGES.length;

  const pb = document.createElement('div');
  pb.className = 'progress-bar';
  pb.id = 'progressBar';
  document.body.appendChild(pb);

  const zh = document.createElement('div');
  zh.className = 'zoom-hint';
  zh.id = 'zoomHint';
  zh.textContent = 'Cubit untuk zoom';
  document.body.appendChild(zh);

  // Flip overlay container
  const fo = document.createElement('div');
  fo.className = 'flip-overlay';
  fo.id = 'flipOverlay';
  document.body.appendChild(fo);

  checkLayout();
  window.addEventListener('resize', checkLayout);
  window.matchMedia('(orientation: landscape)').addEventListener('change', checkLayout);

  const savedSpread = parseInt(localStorage.getItem('bg16-spread') || '0');
  currentSpread = savedSpread;

  // Preload initial spread + neighbors before first render
  preloadAround(currentSpread, () => {
    renderSpread(false);
    preloadNeighbors(currentSpread);
  });

  document.addEventListener('keydown', handleKey);
  initTouch();
  initPinch();
  initPan();
  document.addEventListener('wheel', handleWheel, { passive: false });

  window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 2000);

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchWrap') && !e.target.closest('#searchResults')) {
      closeSearchResults();
    }
  });
});

function hideLoader() {
  const loader = document.getElementById('pageLoader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
    setTimeout(() => loader.style.display = 'none', 400);
  }
}

// ── THEME ─────────────────────────────────────────────────────
function toggleTheme() {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  localStorage.setItem('bg16-theme', theme);
}
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.getElementById('themeIcon').textContent = theme === 'dark' ? '☀' : '◑';
}

// ── IMAGE CACHE / PRELOADER ───────────────────────────────────
function cacheImage(src) {
  if (!src || imageCache.has(src)) return imageCache.get(src) || null;
  const img = new Image();
  img.src = src;
  imageCache.set(src, img);
  return img;
}

function isLoaded(src) {
  if (!src) return false;
  const cached = imageCache.get(src);
  return cached && cached.complete && cached.naturalWidth > 0;
}

// Preload current spread + immediately adjacent spreads
function preloadAround(spreadIndex, callback) {
  const step  = isSinglePage ? 1 : 2;
  const toLoad = [];

  for (let delta = -step; delta <= step * 2; delta += step) {
    const idx = spreadIndex + delta;
    if (idx >= 0 && idx < PAGES.length) toLoad.push(PAGES[idx].src);
    if (!isSinglePage && idx + 1 < PAGES.length) toLoad.push(PAGES[idx + 1].src);
  }

  const unique = [...new Set(toLoad.filter(Boolean))];
  let pending = unique.length;
  if (pending === 0) { callback && callback(); return; }

  unique.forEach(src => {
    const img = cacheImage(src);
    const done = () => { if (--pending === 0) callback && callback(); };
    if (img.complete) { done(); }
    else { img.onload = done; img.onerror = done; }
  });
}

function preloadNeighbors(spreadIndex) {
  const step = isSinglePage ? 1 : 2;
  // Preload 2 spreads ahead and 1 behind
  [-step, step, step * 2].forEach(delta => {
    const idx = spreadIndex + delta;
    if (idx >= 0 && idx < PAGES.length) cacheImage(PAGES[idx].src);
    if (!isSinglePage && idx + 1 < PAGES.length) cacheImage(PAGES[idx + 1].src);
  });
}

// ── LAYOUT DETECTION ─────────────────────────────────────────
function checkLayout() {
  const isPortraitMobile = window.innerWidth < 700 && window.innerHeight > window.innerWidth;
  isSinglePage = isPortraitMobile;
  document.body.classList.toggle('single-page', isSinglePage);

  if (!isSinglePage && currentSpread % 2 !== 0) {
    currentSpread = Math.max(0, currentSpread - 1);
  }
  renderSpread(false);
}

// ── SPREAD RENDERING ─────────────────────────────────────────
function renderSpread(animate, direction) {
  const total = PAGES.length;
  const left  = currentSpread;

  document.getElementById('pageJumpInput').value = left + 1;

  const pct = total <= 1 ? 100 : (left / (total - 1)) * 100;
  document.getElementById('progressBar').style.width = pct + '%';

  document.getElementById('btnPrev').disabled = left <= 0;
  document.getElementById('btnNext').disabled =
    isSinglePage ? left >= total - 1 : left + 2 >= total;

  // Show images from cache (instant if preloaded)
  paintPage('left',  left);
  if (!isSinglePage) {
    const right = left + 1;
    if (right < total) {
      paintPage('right', right);
      document.getElementById('rightPage').style.display = '';
    } else {
      paintPage('right', null);
    }
  }

  localStorage.setItem('bg16-spread', left);
  applyTransform();
  preloadNeighbors(left);
}

function paintPage(side, pageIndex) {
  const img      = document.getElementById(side + 'Img');
  const skeleton = document.getElementById(side + 'Skeleton');

  if (pageIndex === null || pageIndex === undefined || pageIndex >= PAGES.length) {
    img.src = '';
    img.style.opacity = '0';
    skeleton.classList.add('hidden');
    return;
  }

  const page = PAGES[pageIndex];

  if (isLoaded(page.src)) {
    // Instant paint from cache
    img.src = page.src;
    img.alt = 'Halaman ' + page.page;
    img.style.opacity = '1';
    skeleton.classList.add('hidden');
  } else {
    // Show skeleton, load async
    skeleton.classList.remove('hidden');
    img.style.opacity = '0';

    const cached = cacheImage(page.src);
    const finish = () => {
      img.src = page.src;
      img.alt = 'Halaman ' + page.page;
      img.style.opacity = '1';
      skeleton.classList.add('hidden');
    };
    if (cached.complete) { finish(); }
    else {
      cached.onload  = finish;
      cached.onerror = () => {
        img.src = page.src;
        img.style.opacity = '0.4';
        skeleton.classList.add('hidden');
      };
    }
  }
}

// ── FLIP ANIMATION ────────────────────────────────────────────
// A real page-turn: we capture current images, animate a 3-D flip,
// then swap in the new spread underneath.

function doFlip(direction, afterFlip) {
  if (isAnimating) return false;
  isAnimating = true;

  const step    = isSinglePage ? 1 : 2;
  const total   = PAGES.length;
  const overlay = document.getElementById('flipOverlay');
  const outer   = document.getElementById('spreadOuter');

  // Bounding rect of the spread for positioning the flip card
  const sc   = document.getElementById('spreadContainer');
  const rect = sc.getBoundingClientRect();

  // Gather current and next page sources
  const curLeft  = PAGES[currentSpread]     ? PAGES[currentSpread].src     : null;
  const curRight = PAGES[currentSpread + 1] ? PAGES[currentSpread + 1].src : null;

  const nextSpreadIdx = _jumpTarget !== null
    ? _jumpTarget
    : (direction === 'next'
        ? currentSpread + step
        : Math.max(0, currentSpread - step));

  const nxtLeft  = PAGES[nextSpreadIdx]     ? PAGES[nextSpreadIdx].src     : null;
  const nxtRight = PAGES[nextSpreadIdx + 1] ? PAGES[nextSpreadIdx + 1].src : null;

  // Which half flips?
  // next → right half folds to the left, revealing new right then new left
  // prev → left half folds to the right, revealing new left then new right
  const isNext = direction === 'next';

  // Build the flip card
  const card = document.createElement('div');
  card.className = 'flip-card ' + (isNext ? 'flip-from-right' : 'flip-from-left');

  // Position card to exactly match the spread's half
  const halfW  = rect.width / (isSinglePage ? 1 : 2);
  card.style.cssText = `
    position: fixed;
    top: ${rect.top}px;
    ${isNext ? 'left:' + (rect.left + (isSinglePage ? 0 : rect.width / 2)) + 'px' : 'left:' + rect.left + 'px'};
    width: ${halfW}px;
    height: ${rect.height}px;
    transform-style: preserve-3d;
    transform-origin: ${isNext ? 'left' : 'right'} center;
    will-change: transform;
  `;

  // Front face = current turning page
  const front = document.createElement('div');
  front.className = 'flip-face';
  front.style.cssText = 'position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;background:var(--bg2)';
  if (isNext && curRight && !isSinglePage) {
    const fi = document.createElement('img');
    fi.src = curRight;
    fi.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
    front.appendChild(fi);
  } else if (!isNext && curLeft) {
    const fi = document.createElement('img');
    fi.src = curLeft;
    fi.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
    front.appendChild(fi);
  }

  // Back face = next page (flipped 180°)
  const back = document.createElement('div');
  back.className = 'flip-face flip-face-back';
  back.style.cssText = 'position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);overflow:hidden;background:var(--bg2)';
  const backSrc = isNext ? nxtLeft : nxtRight;
  if (backSrc) {
    const bi = document.createElement('img');
    bi.src = backSrc;
    // Mirror image on back face so it reads correctly
    bi.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;transform:scaleX(-1);';
    back.appendChild(bi);
  }

  card.appendChild(front);
  card.appendChild(back);
  overlay.appendChild(card);

  // Trigger animation on next frame
  requestAnimationFrame(() => {
    card.classList.add(isNext ? 'animating-next' : 'animating-prev');
  });

  const DURATION = 420;
  card.addEventListener('animationend', () => {
    // Swap spread
    currentSpread = nextSpreadIdx;
    renderSpread(false);

    // Fade out overlay card
    card.style.transition = 'opacity 0.08s ease';
    card.style.opacity = '0';
    setTimeout(() => {
      overlay.removeChild(card);
      isAnimating = false;
    }, 100);

    afterFlip && afterFlip();
  }, { once: true });

  // Safety fallback
  setTimeout(() => {
    if (isAnimating) {
      overlay.innerHTML = '';
      isAnimating = false;
      currentSpread = nextSpreadIdx;
      renderSpread(false);
    }
  }, DURATION + 300);

  return true;
}

// ── NAVIGATION ───────────────────────────────────────────────
function nextSpread() {
  if (isAnimating) return;
  const step = isSinglePage ? 1 : 2;
  if (currentSpread + step >= PAGES.length) return;

  // Preload the spread after next before flipping
  preloadAround(currentSpread + step, () => {});
  doFlip('next');
}

function prevSpread() {
  if (isAnimating) return;
  if (currentSpread <= 0) return;
  const step = isSinglePage ? 1 : 2;
  const target = Math.max(0, currentSpread - step);

  preloadAround(target, () => {});
  doFlip('prev');
}

function jumpToPage(val) {
  if (isAnimating) return;
  let n = parseInt(val);
  if (isNaN(n)) return;
  n = Math.max(1, Math.min(n, PAGES.length)) - 1;
  if (!isSinglePage && n % 2 !== 0) n = Math.max(0, n - 1);
  if (n === currentSpread) return;
  goToSpread(n);
}

function goToSpread(targetIdx) {
  if (isAnimating) return;
  const dir = targetIdx > currentSpread ? 'next' : 'prev';
  // Preload target, then flip step by step or jump directly
  const step = isSinglePage ? 1 : 2;
  // For large jumps, skip animation and just render
  if (Math.abs(targetIdx - currentSpread) > step * 3) {
    currentSpread = targetIdx;
    renderSpread(false);
    return;
  }
  preloadAround(targetIdx, () => {
    // Temporarily reroute doFlip destination
    const savedSpread = currentSpread;
    // Override next/prev spread index for one flip
    _jumpTarget = targetIdx;
    doFlip(dir, () => { _jumpTarget = null; });
  });
}

// ── KEYBOARD ─────────────────────────────────────────────────
function handleKey(e) {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { nextSpread(); e.preventDefault(); }
  if (e.key === 'ArrowLeft'  || e.key === 'PageUp')   { prevSpread(); e.preventDefault(); }
  if (e.key === '+' || e.key === '=') { adjustZoom(0.15); e.preventDefault(); }
  if (e.key === '-')                  { adjustZoom(-0.15); e.preventDefault(); }
  if (e.key === 'f' || e.key === 'F') { toggleFullscreen(); }
  if (e.key === '0')                  { resetZoom(); }
}

// ── TOUCH / SWIPE ─────────────────────────────────────────────
let touchStartX = 0;
let touchStartY = 0;
let isSwiping   = false;
let swipeDistX  = 0;

function initTouch() {
  const area = document.getElementById('spreadOuter');

  area.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    swipeDistX  = 0;
    isSwiping   = zoomLevel <= 1.01; // only swipe when not zoomed in
  }, { passive: true });

  area.addEventListener('touchmove', (e) => {
    if (!isSwiping || e.touches.length !== 1) return;
    swipeDistX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  area.addEventListener('touchend', (e) => {
    if (!isSwiping || e.changedTouches.length !== 1) return;
    isSwiping = false;
    const dx = swipeDistX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
      if (dx < 0) nextSpread();
      else        prevSpread();
    }
  }, { passive: true });
}

// ── PINCH ZOOM ────────────────────────────────────────────────
let pinchStart = 0;
let zoomAtPinchStart = 1;

function initPinch() {
  const area = document.getElementById('spreadOuter');

  area.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      pinchStart = getPinchDist(e);
      zoomAtPinchStart = zoomLevel;
      isSwiping = false;
    }
  }, { passive: true });

  area.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist   = getPinchDist(e);
      const factor = dist / pinchStart;
      setZoom(zoomAtPinchStart * factor, false);
    }
  }, { passive: false });
}

function getPinchDist(e) {
  const dx = e.touches[0].clientX - e.touches[1].clientX;
  const dy = e.touches[0].clientY - e.touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// ── DRAG TO PAN ───────────────────────────────────────────────
function initPan() {
  const area = document.getElementById('spreadOuter');

  // Mouse drag
  area.addEventListener('mousedown', (e) => {
    if (zoomLevel <= 1.01) return; // only pan when zoomed
    if (e.button !== 0) return;
    isPanning  = true;
    panStartX  = e.clientX;
    panStartY  = e.clientY;
    panOriginX = panX;
    panOriginY = panY;
    area.classList.add('dragging');
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panX = panOriginX + (e.clientX - panStartX);
    panY = panOriginY + (e.clientY - panStartY);
    clampPan();
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    if (!isPanning) return;
    isPanning = false;
    document.getElementById('spreadOuter').classList.remove('dragging');
  });

  // Touch drag (single finger while zoomed)
  area.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1 || zoomLevel <= 1.01) return;
    isPanning  = true;
    panStartX  = e.touches[0].clientX;
    panStartY  = e.touches[0].clientY;
    panOriginX = panX;
    panOriginY = panY;
  }, { passive: true });

  area.addEventListener('touchmove', (e) => {
    if (!isPanning || e.touches.length !== 1) return;
    e.preventDefault();
    panX = panOriginX + (e.touches[0].clientX - panStartX);
    panY = panOriginY + (e.touches[0].clientY - panStartY);
    clampPan();
    applyTransform();
  }, { passive: false });

  area.addEventListener('touchend', () => { isPanning = false; });
}

function clampPan() {
  // Allow panning proportional to how far zoomed in
  const sc   = document.getElementById('spreadContainer');
  const ow   = sc.offsetWidth  * (zoomLevel - 1) / 2;
  const oh   = sc.offsetHeight * (zoomLevel - 1) / 2;
  panX = Math.max(-ow, Math.min(ow, panX));
  panY = Math.max(-oh, Math.min(oh, panY));
}

// ── WHEEL ZOOM (Ctrl+Wheel) ───────────────────────────────────
function handleWheel(e) {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    adjustZoom(delta);
  }
}

// ── ZOOM ─────────────────────────────────────────────────────
function adjustZoom(delta) {
  setZoom(zoomLevel + delta, true);
}

function resetZoom() {
  setZoom(1.0, true);
}

function setZoom(val, showHint) {
  const prev = zoomLevel;
  zoomLevel = Math.max(0.4, Math.min(3.0, val));

  // If returning to 1:1 reset pan
  if (zoomLevel <= 1.01) { panX = 0; panY = 0; }
  else clampPan();

  applyTransform();
  updateZoomCursor();

  document.getElementById('zoomLabel').textContent = Math.round(zoomLevel * 100) + '%';

  if (showHint) {
    const hint = document.getElementById('zoomHint');
    hint.textContent = Math.round(zoomLevel * 100) + '%';
    hint.classList.add('show');
    clearTimeout(hint._t);
    hint._t = setTimeout(() => hint.classList.remove('show'), 1200);
  }
}

function applyTransform() {
  const container = document.getElementById('spreadContainer');
  container.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
}

function updateZoomCursor() {
  const area = document.getElementById('spreadOuter');
  if (zoomLevel > 1.01) {
    area.classList.add('zoomed');
  } else {
    area.classList.remove('zoomed');
  }
}

// ── FULLSCREEN ───────────────────────────────────────────────
function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const el = document.documentElement;
    (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
    isFullscreen = true;
    updateFullIcon(true);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    isFullscreen = false;
    updateFullIcon(false);
  }
}

function updateFullIcon(on) {
  const icon = document.getElementById('fullIcon');
  if (on) {
    icon.innerHTML = `<path d="M5 4a1 1 0 00-1 1v3a1 1 0 01-2 0V5a3 3 0 013-3h3a1 1 0 010 2H5zm10 0a1 1 0 011 1v3a1 1 0 002 0V5a3 3 0 00-3-3h-3a1 1 0 000 2h3zM5 16a1 1 0 001-1v-3a1 1 0 00-2 0v3a3 3 0 003 3h3a1 1 0 000-2H5zm10 0a1 1 0 01-1-1v-3a1 1 0 012 0v3a3 3 0 01-3 3h-3a1 1 0 010-2h3z"/>`;
  } else {
    icon.innerHTML = `<path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H5.414l2.293 2.293a1 1 0 11-1.414 1.414L4 6.414V8a1 1 0 01-2 0V4zm14 0a1 1 0 00-1-1h-4a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 001.414 1.414L15 6.414V8a1 1 0 002 0V4zM3 16a1 1 0 001 1h4a1 1 0 000-2H6.414l2.293-2.293a1 1 0 00-1.414-1.414L5 13.586V12a1 1 0 00-2 0v4zm14 0a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 012 0v4z"/>`;
  }
}

document.addEventListener('fullscreenchange',       () => { isFullscreen = !!document.fullscreenElement;       updateFullIcon(isFullscreen); });
document.addEventListener('webkitfullscreenchange', () => { isFullscreen = !!document.webkitFullscreenElement; updateFullIcon(isFullscreen); });

// ── SEARCH ───────────────────────────────────────────────────
function handleSearch(val) {
  const clear = document.getElementById('searchClear');
  clear.style.display = val ? 'block' : 'none';
  clearTimeout(searchDebounce);
  if (!val.trim()) { closeSearchResults(); return; }
  searchDebounce = setTimeout(() => performSearch(val.trim()), 180);
}

function performSearch(query) {
  const q = query.toLowerCase();
  const results = PAGES.filter(p =>
    p.description.toLowerCase().includes(q) || String(p.page).includes(q)
  );
  const container = document.getElementById('searchResults');
  container.innerHTML = '';
  if (results.length === 0) {
    container.innerHTML = `<div class="search-empty">Tidak ada hasil untuk "<strong>${escHtml(query)}</strong>"</div>`;
  } else {
    results.forEach(p => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      const desc = highlightMatch(p.description, q);
      item.innerHTML = `
        <img class="sri-thumb" src="${escHtml(p.src)}" alt="hal ${p.page}" loading="lazy" />
        <div class="sri-info">
          <div class="sri-page">Halaman ${p.page}</div>
          <div class="sri-desc">${desc}</div>
        </div>
      `;
      item.addEventListener('click', () => { goToPage(p.page); clearSearch(); });
      container.appendChild(item);
    });
  }
  container.classList.add('open');
}

function highlightMatch(text, query) {
  const esc = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escHtml(text).replace(new RegExp(`(${esc})`, 'gi'), '<mark>$1</mark>');
}

function handleSearchKey(e) {
  if (e.key === 'Escape') { clearSearch(); }
  if (e.key === 'Enter') {
    const first = document.querySelector('.search-result-item');
    if (first) first.click();
  }
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').style.display = 'none';
  closeSearchResults();
}

function closeSearchResults() {
  document.getElementById('searchResults').classList.remove('open');
  document.getElementById('searchResults').innerHTML = '';
}

function goToPage(pageNum) {
  if (isAnimating) return;
  let idx = pageNum - 1;
  if (!isSinglePage && idx % 2 !== 0) idx = Math.max(0, idx - 1);
  if (idx === currentSpread) return;
  goToSpread(idx);
}

// ── UTILS ────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
