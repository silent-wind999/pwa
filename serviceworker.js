var baseURL = '/';

self.addEventListener('push', function(event) {
    var json = event.data.json();

    baseURL = json.data.url;

    event.waitUntil(
        self.registration.showNotification(json.notification.title, {
            'body': json.notification.body,
            'tag': 'request',
            'actions': JSON.parse(json.data.action)
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    if (event.action === 'select-a') {
        self.clients.openWindow('https://allabout.co.jp/');
    } else if (event.action === 'select-b') {
        self.clients.openWindow('https://allabout.co.jp/matome/');
    } else {
        self.clients.openWindow(baseURL);
    }

    event.notification.close();
});

/*
// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
	'/pwa/',
	'/pwa/css/style.css',
	'/pwa/drawer.js'
];

// インストール処理
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})
	);
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function(response) {
				return response ? response : fetch(event.request);
			})
	);
});
*/
