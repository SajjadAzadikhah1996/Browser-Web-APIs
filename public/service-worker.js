self.addEventListener('install', async (eve) => {
    /*
    * The new service worker can call skipWaiting() to ask to be activated immediately
        without waiting for open pages to be closed.
    * */
    void self.skipWaiting();

    console.log('Event: Service worker installed.')
})

self.addEventListener('activate', (eve) => {
    console.log('Event: Service worker activated.')
})