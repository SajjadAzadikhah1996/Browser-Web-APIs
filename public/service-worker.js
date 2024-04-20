const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json();
    console.log(users)
}

self.addEventListener('install', async (eve) => {
    console.log('Event: Service worker installing.')
    void self.skipWaiting();
    /*
    * waitUntil() ensures that the service worker will not install until the code inside waitUntil() has occurred.
    * waitUntil() tells the browser that work is ongoing until the promise settles, and it shouldn't terminate the
       service worker if it wants that work to complete
    * */

    await eve.waitUntil(fetchUsers().then(() => console.log('Event: Service worker installed.')))
    // void fetchUsers()
})

/*
 * A service worker won't receive events like fetch and push until it successfully
   finishes installing and becomes "active".
* */
self.addEventListener('activate', (eve) => {

    /*
    * When a service worker is initially registered, pages won't use it until they next load.
       The claim() method causes those pages to be controlled immediately.
       Be aware that this results in your service worker controlling pages that
        loaded regularly over the network, or possibly via a different service worker.
    * */

    // buffer functional events such as fetch and push until the promise passed to waitUntil() settles.

    // eve.waitUntil();

    console.log('Event: Service worker activated.')
})