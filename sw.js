const CACHE = "computing-teacher-mastery-v2";
const CORE = ["./", "index.html", "styles.css", "auth.js", "app.js", "data/core.js", "data/ks3.js", "data/ks4.js", "manifest.webmanifest", "assets/diagrams/icon.svg", "assets/diagrams/tcp-ip-layers.svg", "assets/diagrams/fetch-decode-execute.svg", "assets/diagrams/data-representation.svg", "assets/images/teacher-computing-journey.png", "assets/images/ks3-computing-studio.png", "assets/images/ks4-computer-science.png"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE))));
self.addEventListener("activate", event => event.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())
));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match("index.html"))));
});
