self.addEventListener('install', async (eve) => {
    void self.skipWaiting();
    console.log('Event: Service worker installed.')
})

self.addEventListener('activate', (eve) => {
    eve.waitUntil(self.clients.claim());
    console.log('Event: Service worker activated.')
})

/*
* When claim is commented this listener not working at first time when you register service worker in
   ServiceWorkerProvider.tsx file.*/

addEventListener("fetch", (eve) => {
    console.log(eve.request.url);
});