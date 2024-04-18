'use client';
import {ServiceWorkerProviderComponentType} from "@/types/component";
import useServiceWorker from "@/hooks/useServiceWorker";

const ServiceWorkerProvider: ServiceWorkerProviderComponentType = ({ children }) => {
    useServiceWorker();
    return children;
};

export default ServiceWorkerProvider;