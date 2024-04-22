const version = 'v1';
const cachesToKeep = [version];
const initResources = [
    '/',
    '/fallback'
];

// static caching
const addResourceToCache = async (resources) => {
    const cache = await caches.open(version);
    await cache.addAll(resources);
}

// dynamic caching
const putResourceToCache = async (request, response) => {
    const cache = await caches.open(version);
    await cache.put(request, response);
}

const cacheFirst = async ({request, fallbackUrl}) => {
    const responseFromCache = await caches.match(request);

    if (responseFromCache)
        return responseFromCache;

    try {
        const responseFromNetwork = await fetch(request);
        // Cloning the response is necessary because request and response streams can only be read once.
        // We don't want to wait until the response clone has been added to the cache before returning a response.
        void putResourceToCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (err) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse)
            return fallbackResponse;
        return new Response("Network error happened", {
            status: 408,
            headers: {"Content-Type": "text/plain"},
        });
    }

}

const deleteCache = async (key) => {
    await caches.delete(key);
}

const deleteOldCaches = async () => {
    const keys = await caches.keys();
    const cachesToDelete = keys.filter(key => !cachesToKeep.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
}

self.addEventListener('install', async (eve) => {
    void self.skipWaiting();
    eve.waitUntil(addResourceToCache(initResources));
    console.log('Event: Service worker installed.')
})

self.addEventListener('activate', (eve) => {
    eve.waitUntil(self.clients.claim());
    eve.waitUntil(deleteOldCaches());
    console.log('Event: Service worker activated.')
})

// const customResponse = () => {
//     return new Response('<h1>Custom Response</h1>',
//         {
//             status: 200,
//             headers: new Headers({
//                 "content-type": "text/html; charset=UTF-8",
//             }),
//         })
// }

addEventListener("fetch", (eve) => {
    if (eve.request.url.startsWith('http://') || eve.request.url.startsWith('https://'))
        // Uncomment each line and tick offline mode service worker for testing
        // eve.respondWith(customResponse())
        // eve.respondWith(caches.match('/'))
        // eve.respondWith(caches.match(eve.request))
        eve.respondWith(cacheFirst({
            request: eve.request,
            fallbackUrl: '/fallback'
        }));
});