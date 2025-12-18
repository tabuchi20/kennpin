const CACHE_NAME = "qr-check-v6";

const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./tenyuryoku.html",   // ← 手入力検品
  "./scan.html",         // ← 海外ラベル

  "./manifest.webmanifest",
  "./service-worker.js",

  "./js/jsQR.js",
  "./js/zxing.min.js",

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
