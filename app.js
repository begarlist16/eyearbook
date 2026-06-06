// ============================================================
//  Begarlist 16 — Ebook Reader Logic
// ============================================================

// ── STATE ────────────────────────────────────────────────────
let currentSpread = 0;   // index of left page in spread (0-based)
let isSinglePage  = false;
let zoomLevel     = 1.0;
let isFullscreen  = false;
let searchDebounce = null;

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const saved = localStorage.getItem('bg16-theme') || 'dark';
  setTheme(saved);

  // Inject book title
  document.getElementById('bookTitleText').textContent = BOOK.title;
  document.title = BOOK.title + ' — Ebook Reader';

  // Set total pages
  document.getElementById('pageTotal').textContent = PAGES.length;

  // Inject progress bar into body
  const pb = document.createElement('div');
  pb.className = 'progress-bar';
  pb.id = 'progressBar';
  document.body.appendChild(pb);

  // Inject zoom hint
  const zh = document.createElement('div');
  zh.className = 'zoom-hint';
  zh.id = 'zoomHint';
  zh.textContent = 'Cubit untuk zoom';
  document.body.appendChild(zh);

  // Detect orientation / responsive layout
  checkLayout();
  window.addEventListener('resize', checkLayout);
  window.matchMedia('(orientation: landscape)').addEventListener('change', checkLayout);

  // Load saved position
  const savedSpread = parseInt(localStorage.getItem('bg16-spread') || '0');
  currentSpread = savedSpread;

  // Render
  renderSpread(false);

  // Keyboard
  document.addEventListener('keydown', handleKey);

  // Touch / swipe
  initTouch();

  // Pinch zoom
  initPinch();

  // Wheel zoom
  document.addEventListener('wheel', handleWheel, { passive: false });

  // Hide loader
  window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 2000);

  // Close search on outside click
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

// ── LAYOUT DETECTION ─────────────────────────────────────────
function checkLayout() {
  const isPortraitMobile = window.innerWidth < 700 && window.innerHeight > window.innerWidth;
  isSinglePage = isPortraitMobile;
  document.body.classList.toggle('single-page', isSinglePage);

  // If switching to double-page and currentSpread is odd, adjust
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

  // Update page jump input
  document.getElementById('pageJumpInput').value = left + 1;

  // Update progress bar
  const pct = total <= 1 ? 100 : (left / (total - 1)) * 100;
  document.getElementById('progressBar').style.width = pct + '%';

  // Nav button states
  document.getElementById('btnPrev').disabled = left <= 0;
  document.getElementById('btnNext').disabled =
    isSinglePage ? left >= total - 1 : left + 2 >= total;

  // Animate
  if (animate) {
    const el = document.getElementById('spreadContainer');
    const cls = direction === 'next' ? 'turn-left' : 'turn-right';
    el.classList.remove('turn-left', 'turn-right');
    void el.offsetWidth; // reflow
    el.classList.add(cls);
    el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
  }

  // Load left page
  loadPage('left', left);

  // Load right page (only in double-page mode)
  if (!isSinglePage) {
    if (right < total) {
      loadPage('right', right);
      document.getElementById('rightPage').style.display = '';
    } else {
      // Blank right page when on last odd-page
      loadPage('right', null);
    }
  }

  // Save position
  localStorage.setItem('bg16-spread', left);

  applyZoom();
}

function loadPage(side, pageIndex) {
  const img      = document.getElementById(side + 'Img');
  const skeleton = document.getElementById(side + 'Skeleton');
  const numEl    = document.getElementById(side + 'Num');

  if (pageIndex === null || pageIndex === undefined || pageIndex >= PAGES.length) {
    img.src = '';
    img.style.opacity = '0';
    skeleton.classList.add('hidden');
    numEl.textContent = '';
    return;
  }

  const page = PAGES[pageIndex];
  skeleton.classList.remove('hidden');
  img.style.opacity = '0';
  numEl.textContent = '';

  const temp = new Image();
  temp.onload = () => {
    img.src = page.src;
    img.alt = 'Halaman ' + page.page;
    img.style.opacity = '1';
    skeleton.classList.add('hidden');
    numEl.textContent = page.page;
  };
  temp.onerror = () => {
    img.src = page.src;
    img.style.opacity = '0.4';
    skeleton.classList.add('hidden');
    numEl.textContent = page.page + ' ⚠';
  };
  temp.src = page.src;
}

// ── NAVIGATION ───────────────────────────────────────────────
function nextSpread() {
  const step = isSinglePage ? 1 : 2;
  if (currentSpread + step >= PAGES.length) return;
  currentSpread += step;
  renderSpread(true, 'next');
}

function prevSpread() {
  if (currentSpread <= 0) return;
  const step = isSinglePage ? 1 : 2;
  currentSpread = Math.max(0, currentSpread - step);
  renderSpread(true, 'prev');
}

function jumpToPage(val) {
  let n = parseInt(val);
  if (isNaN(n)) return;
  n = Math.max(1, Math.min(n, PAGES.length)) - 1; // convert to 0-based
  // In double-page, always start on even index
  if (!isSinglePage && n % 2 !== 0) n = Math.max(0, n - 1);
  currentSpread = n;
  renderSpread(true, n > currentSpread ? 'next' : 'prev');
}

// ── KEYBOARD ─────────────────────────────────────────────────
function handleKey(e) {
  // Don't intercept when typing in search/input
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

function initTouch() {
  const area = document.getElementById('spreadOuter');

  area.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping   = true;
  }, { passive: true });

  area.addEventListener('touchend', (e) => {
    if (!isSwiping || e.changedTouches.length !== 1) return;
    isSwiping = false;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
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
      isSwiping = false; // cancel swipe detection
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
  zoomLevel = Math.max(0.4, Math.min(3.0, val));
  applyZoom();

  document.getElementById('zoomLabel').textContent = Math.round(zoomLevel * 100) + '%';

  if (showHint) {
    const hint = document.getElementById('zoomHint');
    hint.textContent = Math.round(zoomLevel * 100) + '%';
    hint.classList.add('show');
    clearTimeout(hint._t);
    hint._t = setTimeout(() => hint.classList.remove('show'), 1200);
  }
}

function applyZoom() {
  const container = document.getElementById('spreadContainer');
  // We scale from center; CSS transform-origin is already center center
  container.style.transform = `scale(${zoomLevel})`;
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
  if (!val.trim()) {
    closeSearchResults();
    return;
  }
  searchDebounce = setTimeout(() => performSearch(val.trim()), 180);
}

function performSearch(query) {
  const q = query.toLowerCase();
  const results = PAGES.filter(p =>
    p.description.toLowerCase().includes(q) ||
    String(p.page).includes(q)
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
      item.addEventListener('click', () => {
        goToPage(p.page);
        clearSearch();
      });
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
    // Navigate to first result
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

// Go to specific page number (1-indexed)
function goToPage(pageNum) {
  let idx = pageNum - 1; // 0-based
  if (!isSinglePage && idx % 2 !== 0) idx = Math.max(0, idx - 1);
  const dir = idx > currentSpread ? 'next' : 'prev';
  currentSpread = idx;
  renderSpread(true, dir);
}

// ── UTILS ────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
