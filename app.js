// ============================================================
//  Begarlist 16 — Ebook Reader Logic
// ============================================================

// ── STATE ────────────────────────────────────────────────────
let currentSpread  = 0;
let isSinglePage   = false;
let zoomLevel      = 1.0;
let isFullscreen   = false;
let searchDebounce = null;

// Pan state
let panX = 0, panY = 0;
let isPanning  = false;
let panStartX  = 0, panStartY  = 0;
let panOriginX = 0, panOriginY = 0;

// Animation lock
let isAnimating = false;
let _jumpTarget = null;

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('bg16-theme') || 'dark';
  setTheme(saved);

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

  const fo = document.createElement('div');
  fo.className = 'flip-overlay';
  fo.id = 'flipOverlay';
  document.body.appendChild(fo);

  checkLayout();
  window.addEventListener('resize', checkLayout);
  window.matchMedia('(orientation: landscape)').addEventListener('change', checkLayout);

  const savedSpread = parseInt(localStorage.getItem('bg16-spread') || '0');
  currentSpread = savedSpread;

  renderSpread(false);
  hideLoader();

  document.addEventListener('keydown', handleKey);
  initTouch();
  initPinch();
  initPan();
  document.addEventListener('wheel', handleWheel, { passive: true });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchWrap') && !e.target.closest('#searchResults')) {
      closeSearchResults();
    }
  });

  initLightboxClickable();
});

function hideLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  loader.classList.add('hidden');
  loader.style.opacity = '0';
  loader.style.pointerEvents = 'none';
  setTimeout(() => { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 450);
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
  const right = left + 1;

  document.getElementById('pageJumpInput').value = left + 1;

  const pct = total <= 1 ? 100 : (left / (total - 1)) * 100;
  document.getElementById('progressBar').style.width = pct + '%';

  document.getElementById('btnPrev').disabled = left <= 0;
  document.getElementById('btnNext').disabled =
    isSinglePage ? left >= total - 1 : left + 2 >= total;

  loadPage('left', left);

  if (!isSinglePage) {
    if (right < total) {
      loadPage('right', right);
      document.getElementById('rightPage').style.display = '';
    } else {
      loadPage('right', null);
    }
  }

  localStorage.setItem('bg16-spread', left);
  applyTransform();
}

// On-demand load — no cache, no preload
function loadPage(side, pageIndex) {
  const img      = document.getElementById(side + 'Img');
  const skeleton = document.getElementById(side + 'Skeleton');

  if (pageIndex === null || pageIndex === undefined || pageIndex >= PAGES.length) {
    img.src = '';
    img.style.opacity = '0';
    skeleton.classList.add('hidden');
    img.closest('.page-slot').classList.remove('has-image');
    return;
  }

  const page = PAGES[pageIndex];
  const fullSrc = page.src + '=s0';
  skeleton.classList.remove('hidden');
  img.style.opacity = '0';

  const temp = new Image();
  temp.onload = () => {
    img.src = fullSrc;
    img.alt = 'Halaman ' + page.page;
    img.style.opacity = '1';
    skeleton.classList.add('hidden');
    img.closest('.page-slot').classList.add('has-image');
  };
  temp.onerror = () => {
    img.src = fullSrc;
    img.style.opacity = '0.4';
    skeleton.classList.add('hidden');
    img.closest('.page-slot').classList.remove('has-image');
  };
  temp.src = fullSrc;
}

// ── FLIP ANIMATION ────────────────────────────────────────────
function doFlip(direction, afterFlip) {
  if (isAnimating) return false;
  isAnimating = true;

  const step  = isSinglePage ? 1 : 2;
  const overlay = document.getElementById('flipOverlay');

  const nextSpreadIdx = _jumpTarget !== null
    ? _jumpTarget
    : (direction === 'next'
        ? currentSpread + step
        : Math.max(0, currentSpread - step));

  const isNext = direction === 'next';

  // ── SINGLE-PAGE MODE: slide animation ────────────────────
  if (isSinglePage) {
    const sc   = document.getElementById('spreadContainer');
    const rect = sc.getBoundingClientRect();
    const W    = rect.width;

    const curSrc = PAGES[currentSpread] ? PAGES[currentSpread].src + '=s0' : null;
    const nxtSrc = PAGES[nextSpreadIdx] ? PAGES[nextSpreadIdx].src + '=s0' : null;

    const DURATION = 320;

    // Outgoing page (current, slides out)
    const outCard = document.createElement('div');
    outCard.style.cssText = `
      position: fixed;
      top: ${rect.top}px; left: ${rect.left}px;
      width: ${W}px; height: ${rect.height}px;
      overflow: hidden; background: var(--bg2);
      will-change: transform;
      transition: transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1);
      z-index: 151;
    `;
    if (curSrc) {
      const img = document.createElement('img');
      img.src = curSrc;
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
      outCard.appendChild(img);
    }

    // Incoming page (next, slides in from opposite side)
    const inCard = document.createElement('div');
    inCard.style.cssText = `
      position: fixed;
      top: ${rect.top}px; left: ${rect.left}px;
      width: ${W}px; height: ${rect.height}px;
      overflow: hidden; background: var(--bg2);
      will-change: transform;
      transform: translateX(${isNext ? W : -W}px);
      transition: transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1);
      z-index: 150;
    `;
    if (nxtSrc) {
      const img = document.createElement('img');
      img.src = nxtSrc;
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
      inCard.appendChild(img);
    }

    overlay.appendChild(outCard);
    overlay.appendChild(inCard);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        outCard.style.transform = `translateX(${isNext ? -W : W}px)`;
        inCard.style.transform  = 'translateX(0)';
      });
    });

    setTimeout(() => {
      currentSpread = nextSpreadIdx;
      _jumpTarget   = null;
      renderSpread(false);
      overlay.innerHTML = '';
      isAnimating = false;
      afterFlip && afterFlip();
    }, DURATION + 40);

    return true;
  }

  // ── DOUBLE-PAGE MODE: flip animation (original) ──────────
  const sc   = document.getElementById('spreadContainer');
  const rect = sc.getBoundingClientRect();

  const curLeft  = PAGES[currentSpread]     ? PAGES[currentSpread].src + '=s0'     : null;
  const curRight = PAGES[currentSpread + 1] ? PAGES[currentSpread + 1].src + '=s0' : null;

  const nxtLeft  = PAGES[nextSpreadIdx]     ? PAGES[nextSpreadIdx].src + '=s0'     : null;
  const nxtRight = PAGES[nextSpreadIdx + 1] ? PAGES[nextSpreadIdx + 1].src + '=s0' : null;

  const halfW = rect.width / 2;

  const card = document.createElement('div');
  card.className = 'flip-card ' + (isNext ? 'flip-from-right' : 'flip-from-left');
  card.style.cssText = `
    position: fixed;
    top: ${rect.top}px;
    ${isNext
      ? 'left:' + (rect.left + rect.width / 2) + 'px'
      : 'left:' + rect.left + 'px'};
    width: ${halfW}px;
    height: ${rect.height}px;
    transform-style: preserve-3d;
    transform-origin: ${isNext ? 'left' : 'right'} center;
    will-change: transform;
  `;

  const front = document.createElement('div');
  front.style.cssText = 'position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;background:var(--bg2)';
  if (isNext && curRight) {
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

  const back = document.createElement('div');
  back.style.cssText = 'position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);overflow:hidden;background:var(--bg2)';
  const backSrc = isNext ? nxtLeft : nxtRight;
  if (backSrc) {
    const bi = document.createElement('img');
    bi.src = backSrc;
    bi.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;transform:scaleX(-1);';
    back.appendChild(bi);
  }

  card.appendChild(front);
  card.appendChild(back);
  overlay.appendChild(card);

  requestAnimationFrame(() => {
    card.classList.add(isNext ? 'animating-next' : 'animating-prev');
  });

  const DURATION = 420;
  card.addEventListener('animationend', () => {
    currentSpread = nextSpreadIdx;
    _jumpTarget   = null;
    renderSpread(false);

    card.style.transition = 'opacity 0.08s ease';
    card.style.opacity = '0';
    setTimeout(() => {
      if (overlay.contains(card)) overlay.removeChild(card);
      isAnimating = false;
    }, 100);

    afterFlip && afterFlip();
  }, { once: true });

  setTimeout(() => {
    if (isAnimating) {
      overlay.innerHTML = '';
      isAnimating   = false;
      _jumpTarget   = null;
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
  doFlip('next');
}

function prevSpread() {
  if (isAnimating) return;
  if (currentSpread <= 0) return;
  doFlip('prev');
}

function jumpToPage(val) {
  if (isAnimating) return;
  let n = parseInt(val);
  if (isNaN(n)) return;
  n = Math.max(1, Math.min(n, PAGES.length)) - 1;
  if (!isSinglePage && n % 2 !== 0) n = Math.max(0, n - 1);
  if (n === currentSpread) return;
  const dir = n > currentSpread ? 'next' : 'prev';
  // Large jumps skip animation
  const step = isSinglePage ? 1 : 2;
  if (Math.abs(n - currentSpread) > step * 3) {
    currentSpread = n;
    renderSpread(false);
    return;
  }
  _jumpTarget = n;
  doFlip(dir);
}

function goToPage(pageNum) {
  jumpToPage(pageNum);
}

// ── KEYBOARD ─────────────────────────────────────────────────
function handleKey(e) {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { if (!lightboxOpen) { nextSpread(); e.preventDefault(); } else { lightboxNav(1); e.preventDefault(); } }
  if (e.key === 'ArrowLeft'  || e.key === 'PageUp')   { if (!lightboxOpen) { prevSpread(); e.preventDefault(); } else { lightboxNav(-1); e.preventDefault(); } }
  if (e.key === 'f' || e.key === 'F') { if (!lightboxOpen) toggleFullscreen(); }
  if (e.key === 'Escape') { if (lightboxOpen) closeLightbox(); }
}

// ── TOUCH / SWIPE ─────────────────────────────────────────────
let touchStartX = 0, touchStartY = 0, isSwiping = false;

function initTouch() {
  const area = document.getElementById('spreadOuter');

  area.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping   = zoomLevel <= 1.01;
  }, { passive: true });

  area.addEventListener('touchend', (e) => {
    if (!isSwiping || e.changedTouches.length !== 1) return;
    isSwiping = false;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
      if (dx < 0) nextSpread();
      else        prevSpread();
    }
  }, { passive: true });
}

// ── PINCH ZOOM ────────────────────────────────────────────────
let pinchStart = 0, zoomAtPinchStart = 1;

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
      const factor = getPinchDist(e) / pinchStart;
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

  area.addEventListener('mousedown', (e) => {
    if (zoomLevel <= 1.01 || e.button !== 0) return;
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
  const sc = document.getElementById('spreadContainer');
  const ow = sc.offsetWidth  * (zoomLevel - 1) / 2;
  const oh = sc.offsetHeight * (zoomLevel - 1) / 2;
  panX = Math.max(-ow, Math.min(ow, panX));
  panY = Math.max(-oh, Math.min(oh, panY));
}

// ── WHEEL ZOOM ────────────────────────────────────────────────
// Scroll-to-zoom dinonaktifkan; gunakan overlay "Lihat HD" untuk lightbox
function handleWheel(e) {
  // no-op: zoom via scroll dihapus
}

// ── ZOOM ─────────────────────────────────────────────────────
function adjustZoom(delta) { setZoom(zoomLevel + delta, true); }
function resetZoom()        { setZoom(1.0, true); }

function setZoom(val, showHint) {
  zoomLevel = Math.max(0.4, Math.min(3.0, val));
  if (zoomLevel <= 1.01) { panX = 0; panY = 0; }
  else clampPan();

  applyTransform();

  const area = document.getElementById('spreadOuter');
  if (zoomLevel > 1.01) area.classList.add('zoomed');
  else                  area.classList.remove('zoomed');

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
  document.getElementById('spreadContainer').style.transform =
    `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
}

// ── FULLSCREEN ───────────────────────────────────────────────
function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const el = document.documentElement;
    (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
    isFullscreen = true; updateFullIcon(true);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    isFullscreen = false; updateFullIcon(false);
  }
}

function updateFullIcon(on) {
  document.getElementById('fullIcon').innerHTML = on
    ? `<path d="M5 4a1 1 0 00-1 1v3a1 1 0 01-2 0V5a3 3 0 013-3h3a1 1 0 010 2H5zm10 0a1 1 0 011 1v3a1 1 0 002 0V5a3 3 0 00-3-3h-3a1 1 0 000 2h3zM5 16a1 1 0 001-1v-3a1 1 0 00-2 0v3a3 3 0 003 3h3a1 1 0 000-2H5zm10 0a1 1 0 01-1-1v-3a1 1 0 012 0v3a3 3 0 01-3 3h-3a1 1 0 010-2h3z"/>`
    : `<path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H5.414l2.293 2.293a1 1 0 11-1.414 1.414L4 6.414V8a1 1 0 01-2 0V4zm14 0a1 1 0 00-1-1h-4a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 001.414 1.414L15 6.414V8a1 1 0 002 0V4zM3 16a1 1 0 001 1h4a1 1 0 000-2H6.414l2.293-2.293a1 1 0 00-1.414-1.414L5 13.586V12a1 1 0 00-2 0v4zm14 0a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 012 0v4z"/>`;
}

document.addEventListener('fullscreenchange',       () => { isFullscreen = !!document.fullscreenElement;       updateFullIcon(isFullscreen); });
document.addEventListener('webkitfullscreenchange', () => { isFullscreen = !!document.webkitFullscreenElement; updateFullIcon(isFullscreen); });

// ── SEARCH ───────────────────────────────────────────────────
function handleSearch(val) {
  document.getElementById('searchClear').style.display = val ? 'block' : 'none';
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
      item.innerHTML = `
        <img class="sri-thumb" src="${escHtml(p.src)}=w200-h200" alt="hal ${p.page}" loading="lazy" />
        <div class="sri-info">
          <div class="sri-page">Halaman ${p.page}</div>
          <div class="sri-desc">${highlightMatch(p.description, q)}</div>
        </div>`;
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
  if (e.key === 'Escape') clearSearch();
  if (e.key === 'Enter') { const f = document.querySelector('.search-result-item'); if (f) f.click(); }
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').style.display = 'none';
  closeSearchResults();
}

function closeSearchResults() {
  const r = document.getElementById('searchResults');
  r.classList.remove('open');
  r.innerHTML = '';
}

// ── MOBILE SEARCH ────────────────────────────────────────────
let mobileSearchDebounce = null;

function openMobileSearch() {
  const modal = document.getElementById('mobileSearchModal');
  modal.classList.add('open');
  setTimeout(() => {
    const input = document.getElementById('mobileSearchInput');
    input.focus();
  }, 280);
}

function closeMobileSearch() {
  const modal = document.getElementById('mobileSearchModal');
  modal.classList.remove('open');
  clearMobileSearch();
}

function handleMobileSearch(val) {
  document.getElementById('mobileSearchClear').style.display = val ? 'block' : 'none';
  clearTimeout(mobileSearchDebounce);
  const container = document.getElementById('mobileSearchResults');
  if (!val.trim()) { container.innerHTML = ''; return; }
  mobileSearchDebounce = setTimeout(() => performMobileSearch(val.trim()), 180);
}

function performMobileSearch(query) {
  const q = query.toLowerCase();
  const results = PAGES.filter(p =>
    p.description.toLowerCase().includes(q) || String(p.page).includes(q)
  );
  const container = document.getElementById('mobileSearchResults');
  container.innerHTML = '';
  if (results.length === 0) {
    container.innerHTML = `<div class="search-empty">Tidak ada hasil untuk "<strong>${escHtml(query)}</strong>"</div>`;
  } else {
    results.forEach(p => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `
        <img class="sri-thumb" src="${escHtml(p.src)}=w200-h200" alt="hal ${p.page}" loading="lazy" />
        <div class="sri-info">
          <div class="sri-page">Halaman ${p.page}</div>
          <div class="sri-desc">${highlightMatch(p.description, q)}</div>
        </div>`;
      item.addEventListener('click', () => { closeMobileSearch(); goToPage(p.page); });
      container.appendChild(item);
    });
  }
}

function handleMobileSearchKey(e) {
  if (e.key === 'Escape') closeMobileSearch();
  if (e.key === 'Enter') {
    const f = document.querySelector('#mobileSearchResults .search-result-item');
    if (f) f.click();
  }
}

function clearMobileSearch() {
  document.getElementById('mobileSearchInput').value = '';
  document.getElementById('mobileSearchClear').style.display = 'none';
  document.getElementById('mobileSearchResults').innerHTML = '';
}

// ── UTILS ────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── LIGHTBOX ─────────────────────────────────────────────────
let lightboxOpen = false;
let lightboxIndex = 0;

function initLightboxClickable() {
  // Klik gambar untuk lightbox sekarang ditangani oleh overlay .hd-overlay di HTML
  // Cursor diatur via CSS pada overlay
}

function openLightboxCurrent() {
  openLightbox(currentSpread);
}

function openLightbox(pageIndex) {
  lightboxIndex = pageIndex;
  lightboxOpen  = true;
  const overlay = document.getElementById('lightboxOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  loadLightboxImage(pageIndex);
}

function loadLightboxImage(pageIndex) {
  const page    = PAGES[pageIndex];
  const img     = document.getElementById('lightboxImg');
  const spinner = document.getElementById('lightboxSpinner');
  const caption = document.getElementById('lightboxCaption');

  img.style.opacity = '0';
  spinner.classList.add('active');
  caption.textContent = '';

  // =s0 fetches highest-resolution / original size from Google Drive
  const src = page.src + '=s0';

  const temp = new Image();
  temp.onload = () => {
    img.src = src;
    img.style.opacity = '1';
    spinner.classList.remove('active');
    caption.textContent = 'Halaman ' + page.page + (page.description ? ' — ' + page.description : '');
  };
  temp.onerror = () => {
    img.src = src;
    img.style.opacity = '0.5';
    spinner.classList.remove('active');
  };
  temp.src = src;

  document.getElementById('lightboxPrev').style.visibility = pageIndex > 0 ? 'visible' : 'hidden';
  document.getElementById('lightboxNext').style.visibility = pageIndex < PAGES.length - 1 ? 'visible' : 'hidden';
}

function lightboxNav(dir) {
  const next = lightboxIndex + dir;
  if (next < 0 || next >= PAGES.length) return;
  lightboxIndex = next;
  loadLightboxImage(lightboxIndex);
}

function closeLightbox() {
  lightboxOpen = false;
  const overlay = document.getElementById('lightboxOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    const img = document.getElementById('lightboxImg');
    if (img) img.src = '';
  }, 300);
}

function closeLightboxOnBackdrop(e) {
  if (e.target === document.getElementById('lightboxOverlay') ||
      e.target === document.getElementById('lightboxInner')) {
    closeLightbox();
  }
}
