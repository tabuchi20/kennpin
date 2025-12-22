const CACHE_NAME = "qr-check-v9";

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

// インストール時：キャッシュ
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES))
  );
});

// 古いキャッシュ削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// 通信時：キャッシュ優先
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
