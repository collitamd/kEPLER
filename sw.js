// Kepler · Citta-k — funciona sin Internet una vez instalada
const CACHE = 'kepler-mwneungb', ARCHIVOS = ['./', 'index.html', 'manifest.webmanifest', 'icono-192.png', 'icono-512.png', 'icono-512-mask.png', 'icono-180.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // primero la red (para recibir actualizaciones); sin conexión, la copia guardada
  e.respondWith(fetch(e.request).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return res; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(m => m || caches.match('index.html'))));
});
