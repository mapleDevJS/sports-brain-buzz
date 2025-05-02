import React from 'react';
import { createRoot } from 'react-dom/client';

// Core types and configuration
import { HttpClient } from './_application/ports';
import { createHttpService } from './_services/http.service';
// Service factories
import { createDefaultHttpClient } from './_services/http-client.service';
import { createDefaultLogger, createLoggerService } from './_services/logger.service';
import { createQuizApiService } from './_services/quiz-api.service';
// Application contexts and components
import { ServicesProvider } from './_services/store/services';
import { Services } from './_services/store/services-context';
import { Provider } from './_services/store/store';
import App from './_ui/App';
import { CONFIG } from './constants/config.constants';

/**
 * Initialize all application services
 * @returns Configured service instances
 */
const initializeServices = (): Services => {
    const defaultClient: HttpClient = createDefaultHttpClient();
    const logger = createDefaultLogger();
    const loggerService = createLoggerService(logger);
    const httpService = createHttpService(defaultClient);
    const quizApiService = createQuizApiService(httpService);

    return {
        loggerService,
        quizApiService,
    };
};

/**
 * Render the React application with the provided services
 * @param rootElement DOM element to mount the app
 * @param services Application services
 */
const renderApp = (rootElement: HTMLElement, services: Services): void => {
    const root = createRoot(rootElement);

    root.render(
        <Provider>
            <React.StrictMode>
                <ServicesProvider services={services}>
                    <App />
                </ServicesProvider>
            </React.StrictMode>
        </Provider>
    );
};

/**
 * Handle the case when a root element cannot be found
 * @param elementId ID of the missing root element
 */
const handleMissingRootElement = (elementId: string): void => {
    console.error(CONFIG.ERROR_MESSAGES.ROOT_NOT_FOUND(elementId));
};

/**
 * Bootstrap the application
 */
const bootstrapApplication = (): void => {
    const rootElement = document.getElementById(CONFIG.ROOT_ELEMENT_ID);

    if (rootElement) {
        const services = initializeServices();
        renderApp(rootElement, services);
    } else {
        handleMissingRootElement(CONFIG.ROOT_ELEMENT_ID);
    }
};

// Start the application
bootstrapApplication();
