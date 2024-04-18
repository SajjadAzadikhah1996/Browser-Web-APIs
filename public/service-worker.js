// SERVICE WORKER EVENTS


// The installation event is fired when an installation is successfully completed.

/*
* The first event a service worker gets is install. It's triggered as soon as the worker executes,  and it's only called
    once per service worker(refresh the page, you will see this not calling anymore until unregister service worker)
* */

/*
* When you register a new version of service worker(by changing the source code of this file),
    refreshing the page fires it again (because browser it changed and browser install it again), but
    does not active it(because we have already an active service worker.)(waiting mode)
    actually we can have another installed service worker, but we just have only one active service worker.
* */

self.addEventListener('install', (eve) => {
    console.log('Event: Service worker installed.')
})

/*
* This fires once at first time because after installing service worker it must be active.
* This fires once the old service worker is gone, and your new service worker is able to control clients.
* */

self.addEventListener('activate', (eve) => {
    console.log('Event: Service worker activated.')
})