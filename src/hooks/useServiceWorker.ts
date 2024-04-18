import {useEffect, useState} from "react";

export default function useServiceWorker() {
    const [serviceWorker, setServiceWorker] = useState<ServiceWorkerRegistration>();

    useEffect(() => {
        const registerServiceWorker = async () => {
            // Checks if the service worker is supported.
            if ("serviceWorker" in navigator) {
                try {
                    // The service worker file extension must be .js because .ts is not supported by browsers.
                    // The service worker file must be directly under public folder to control max scope (all pages).
                    const _serviceWorker = await navigator.serviceWorker.register(
                        './service-worker.js',
                        { scope: '/' }
                    );
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