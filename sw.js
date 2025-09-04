// service-worker.js
var CACHE_NAME = 'bhara-site-cache';
var urlsToCache = [
  'system/qr_codes/QR-Systems.js',
  'system/qr_codes/Scoring.js',
  'system/soundEffects.js',
  'Images/Background.png',
  'Images/sun.png',
  'Images/bronze.png',
  'Images/silver.png',
  'Images/gold.png',
  'styles.css',
  'answerSelection.html',
  'difficultySelection.html',
  'locationPrompt.html',
  'progress.html',
  'qrScanner.html',
  'sw.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // If a match is found in the cache, return it
          if (cachedResponse) {
            return cachedResponse;
          }
  
          // Otherwise, perform a network request
          return fetch(event.request).then(networkResponse => {
            // If the response is invalid, just return it
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
  
            // Otherwise, cache the downloaded files
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
  
            return networkResponse;
          });
        })
    );
  });  