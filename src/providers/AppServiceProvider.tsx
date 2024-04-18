import {AppServiceProviderComponentType} from "@/types/component";
import ServiceWorkerProvider from "@/providers/ServiceWorkerProvider";

const AppServiceProvider: AppServiceProviderComponentType = ({ children }) => {
    return (
        <ServiceWorkerProvider>
            {children}
        </ServiceWorkerProvider>
    );
};

export default AppServiceProvider;
