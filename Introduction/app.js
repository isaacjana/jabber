// Import the Workbox library
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// Check if Workbox is available
if (workbox) {
  console.log('Workbox is loaded.');

  // Cache the HTML page
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.NetworkFirst()
  );

  // Cache CSS and JavaScript files
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script' ||
                   request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate()
  );

  // Cache images
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
  );

  // Cache other assets
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'font' ||
                   request.destination === 'audio' ||
                   request.destination === 'video',
    new workbox.strategies.CacheFirst()
  );

  // Cache the manifest file
  workbox.routing.registerRoute(
    ({ request }) => request.url.endsWith('.json'),
    new workbox.strategies.StaleWhileRevalidate()
  );

} else {
  console.log('Workbox could not be loaded. Please make sure you are using a supported browser.');
}
