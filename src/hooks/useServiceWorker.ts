import {useEffect, useState} from "react";

export default function useServiceWorker() {
    const [serviceWorker, setServiceWorker] = useState<ServiceWorkerRegistration>();

    // useEffect just runs one time at first time. open console and refresh the page to see update cycle.
    useEffect(() => {
        const registerServiceWorker = async () => {
            if ("serviceWorker" in navigator) {
                try {
                    const _serviceWorker = await navigator.serviceWorker.register(
                        './service-worker.js',
                        { scope: '/' }
                    );
                    // SERVICE WORKER NOTIFICATIONS
                    if (_serviceWorker.installing) {
                        /*
                        * This block runs once you register service worker (we registered it in ServiceWorkerProvider.tsx file )
                           after that when you refresh the page this block not running anymore.
                        * */
                        console.log("Notification: Service worker is installing");
                    } else if (_serviceWorker.waiting) {
                        /*
                        * After it's successfully installed, the updated service worker delays activating until
                           the existing service worker is no longer controlling clients. This state is called "waiting",
                           and it's how the browser ensures that only one version of your service worker is running at a time.
                        * Once all pages controlled by the old version of the service worker have closed, it's safe to
                           retire the old version, and the newly installed service worker receives an activate event.
                        * Call skipWaiting() to ask to be activated immediately without waiting for open pages to be closed.
                        * To override this default behavior and adopt open pages, a service worker can call clients.claim().
                        * */
                        console.log("Notification: Service Worker is installed and active, but a new version of Service " +
                            "Worker is available. (waiting mode)");
                    } else if (_serviceWorker.active) {
                        /*
                        * This block runs once the old service worker is gone, and your new service worker(or first service worker)
                           is able to control clients.
                        * */
                        console.log("Notification: Service worker is active");
                    }
                    setServiceWorker(_serviceWorker);
                } catch (err) {
                    console.log(`Notification: Registration failed with ${err} `);
                }
            } else
                console.log('Service worker is not supported.');
        };

        void registerServiceWorker();
    }, []);

    return serviceWorker;
}