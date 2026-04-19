const CACHE_NAME = 'negocio-cache-v1';
const urlsToCache = [
  './',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) { return response; }
        return fetch(event.request).then(response => {
          if(!response || response.status !== 200 || response.type !== 'basic') { return response; }
          var responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => { cache.put(event.request, responseToCache); });
          return response;
        });
      })
  );
});