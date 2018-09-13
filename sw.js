const staticCacheName = 'reviews-cache-v3'
const assets = [
				'./restaurant-reviews-app/',
				'./restaurant-reviews-app/index.html',
				'./restaurant-reviews-app/restaurant.html',
				'./restaurant-reviews-app/css/styles.css',
				'./restaurant-reviews-app/data/restaurants.json',
				'./restaurant-reviews-app/js/dbhelper.js',
				'./restaurant-reviews-app/js/main.js',
				'./restaurant-reviews-app/js/restaurant_info.js'
			]

/*
 * Add site assets to cache
 */

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(assets)
		})
	);
})

/*
 * Fetch responses from the cache.
 * If unavailable fetch from network
 */

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});

/*
 * Remove old caches when new one is created
 */

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cachesList) {
			return Promise.all(
				cachesList.filter(function(cacheName) {
					return cacheName.startsWith('reviews-cache-') && cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
})



