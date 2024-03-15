// Service Worker

// Cache name
const cacheName = 'wedding-couple-app-v1';

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/background_music.mp3', // Add your audio file
  '/couple.jpg', // Add your image files
  '/john.jpg',
  '/sarah.jpg'
];

// Install service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// Activate service worker and clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(existingCacheName) {
          if (existingCacheName !== cacheName) {
            return caches.delete(existingCacheName);
          }
        })
      );
    })
  );
});

// Fetch resources from cache or network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      // Fetch from network
      return fetch(fetchRequest).then(function(response) {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache the response
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
