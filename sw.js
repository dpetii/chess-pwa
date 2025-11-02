const CACHE_NAME = 'chess-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/chess.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Telepítés
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Cache-ből szolgálás
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Régi cache törlése
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
