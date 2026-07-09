/* Reise-Roulette Service Worker
 * Cached app shell = the UI works offline / on flaky connections.
 * Live timetable data (transport.opendata.ch) is always fetched fresh from the network.
 */
const CACHE = 'reiseroulette-v5';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Never cache the live timetable API – always go to the network.
  if (url.hostname.includes('opendata.ch')) {
    return; // let the browser handle it normally
  }

  // Google Fonts: cache-first once fetched (fonts rarely change).
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => hit))
    );
    return;
  }

  // App shell: cache-first, fall back to network, then to cached index.html.
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).catch(() => caches.match('./index.html')))
  );
});
