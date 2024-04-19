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

                    // It fires when a new service worker is activated.
                    navigator.serviceWorker.oncontrollerchange = (eve) => {
                        console.log("New service worker activated.");
                    };


                    navigator.serviceWorker.ready.then((registration) => {
                        if (registration.active)
                            registration.active.postMessage("Hi service worker");
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