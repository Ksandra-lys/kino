const CACHE_NAME = 'v1_site_cache';

// Liste des fichiers importants à sauvegarder en cache
const ASSETS_TO_CACHE = [
  '/',
  "/index.html",
  "/manifest.json",
  
  // "/css/index.css",
  // "/src/js/index.ts"
  
  
];

//1. Phase d'installation : création du cache et ajout des fichiers
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker : Mise en cache des fichiers');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// self.addEventListener("install", (e) => {
//   console.log("[Service Worker] Install");
//   e.waitUntil(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);
//       console.log("[Service Worker] Caching all: app shell and content");
//       await cache.addAll(ASSETS_TO_CACHE);
//     })(),
//   );
// });


self.addEventListener('fetch', (event) => { 
  event.respondWith(
    caches.match(event.request).then((response) => {
      
      return response || fetch(event.request);
    })
  );
});