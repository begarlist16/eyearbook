// ============================================================
//  Begarlist 16 — Service Worker
//  Strategy:
//    • Shell assets  → Cache-First  (versioned cache)
//    • Ebook images  → Cache-First  (separate long-lived cache)
//    • Everything else → Network-First with cache fallback
// ============================================================

const SHELL_CACHE   = 'bg16-shell-v1';
const IMAGE_CACHE   = 'bg16-images-v1';
const KNOWN_CACHES  = [SHELL_CACHE, IMAGE_CACHE];

// Static shell files to pre-cache on install
const SHELL_FILES = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data.js',
  // Google Fonts (best-effort – see fetch handler for runtime caching)
];

// ── INSTALL ──────────────────────────────────────────────────
// Pre-cache the app shell so it loads instantly even offline.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => {
      return cache.addAll(SHELL_FILES);
    }).then(() => self.skipWaiting())   // Activate new SW immediately
  );
});

// ── ACTIVATE ─────────────────────────────────────────────────
// Delete stale caches from old versions.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !KNOWN_CACHES.includes(key))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())  // Take control of all open tabs
  );
});

// ── FETCH ─────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // ── 1. Ebook images from Google Drive / ggpht / lh3.googleusercontent
  //       These URLs contain "googleusercontent" or "drive.google" and end with =s0
  if (isEbookImage(url)) {
    event.respondWith(cacheFirstImage(request));
    return;
  }

  // ── 2. Shell assets (same origin or fonts.googleapis.com / fonts.gstatic.com)
  if (isShellAsset(url)) {
    event.respondWith(cacheFirstShell(request));
    return;
  }

  // ── 3. Everything else → network first, fall back to cache
  event.respondWith(networkFirstGeneric(request));
});

// ── HELPERS ──────────────────────────────────────────────────

function isEbookImage(url) {
  return (
    url.hostname.includes('googleusercontent.com') ||
    url.hostname.includes('ggpht.com') ||
    url.hostname.includes('lh3.google.com') ||
    (url.hostname.includes('drive.google.com') && url.pathname.includes('/file/'))
  );
}

function isShellAsset(url) {
  const isSameOrigin = url.origin === self.location.origin;
  const isFonts =
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com';
  return isSameOrigin || isFonts;
}

// Cache-First for ebook images — once fetched, served instantly forever
async function cacheFirstImage(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, response.clone()); // async write, don't await
    }
    return response;
  } catch {
    // Offline and not cached — return a simple 503
    return new Response('Image not cached yet', { status: 503 });
  }
}

// Cache-First for shell assets — fall back to network if missing
async function cacheFirstShell(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return a basic offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('./index.html');
      if (offlinePage) return offlinePage;
    }
    return new Response('Offline', { status: 503 });
  }
}

// Network-First for everything else
async function networkFirstGeneric(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// ── MESSAGE: force-update & clear-caches ─────────────────────
self.addEventListener('message', async (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data === 'CLEAR_IMAGE_CACHE') {
    await caches.delete(IMAGE_CACHE);
    event.ports[0]?.postMessage({ cleared: true });
  }

  if (event.data === 'GET_CACHE_SIZE') {
    const cache  = await caches.open(IMAGE_CACHE);
    const keys   = await cache.keys();
    event.ports[0]?.postMessage({ imageCount: keys.length });
  }
});
