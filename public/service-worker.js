console.log({self})  //refers to ServiceWorkerGlobalScope

self.addEventListener('install', (eve) => {
    console.log('Event: Service worker installed.')
})

self.addEventListener('activate', (eve) => {
    console.log('Event: Service worker activated.')
})

// refresh twice to see result.
self.addEventListener('fetch', (eve) => {
    console.log(eve.request.url)
})

addEventListener("message", (event) => {
    console.log(`The client sent me a message: ${event.data}`);
});