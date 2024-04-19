import {useEffect, useState} from "react";

export default function useServiceWorker() {
    const [serviceWorker, setServiceWorker] = useState<ServiceWorkerRegistration>();

    useEffect(() => {
        const registerServiceWorker = async () => {
            if ("serviceWorker" in navigator) {
                try {
                    const _serviceWorker = await navigator.serviceWorker.register(
                        './service-worker.js',
                        { scope: '/' }
                    );

                    // controller and ready are instance properties of service worker.

                    // ready property provides a way of delaying code execution until a service worker is active.
                    navigator.serviceWorker.ready.then((registration) => {
                        console.log('A service worker is active: ', registration.active);
                        /*
                         At this point, you can call methods that require an active service worker,
                         like registration.pushManager.subscribe()
                        * */
                    });

                    setServiceWorker(_serviceWorker);
                } catch (err) {
                    console.log(`Registration failed with ${err} `);
                }
            } else
                console.log('Service worker is not supported.');
        };

        void registerServiceWorker();
    }, []);

    return serviceWorker;
}