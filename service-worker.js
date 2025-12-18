const CACHE_NAME = "qr-check-v1";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./service-worker.js",

  "./js/jsQR.js",

  "./sounds/yomitori.mp3",
  "./sounds/seikou.mp3",
  "./sounds/keikoku.mp3",

  "./icon/favicon.png",
  "./icon/icon-180.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
