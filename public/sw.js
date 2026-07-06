// Minimal service worker for PWA installability
const CACHE_NAME = 'lucidlibs-tools-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Basic fetch handler — network-first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
