import React from 'react';
import { createRoot } from 'react-dom/client';

// Core types and configuration
import { HttpClient, Logger } from './_application/ports/ports.ts';
import { createQuizApiService } from './_services/api/quiz-api.service.ts';
// Application contexts and components
import { ServicesProvider } from './_services/di/services.tsx';
import { Services } from './_services/di/services-context.tsx';
// Service factories
import { createDefaultHttpClient } from './_services/http/http.client.ts';
import { createHttpService } from './_services/http/http.service.ts';
import { createLoggerService } from './_services/logger/logger.service.ts';
import { createDefaultLogger } from './_services/logger/logger.ts';
import { StorageProvider } from './_services/storage/quiz/quiz-store.tsx';
import App from './_ui/components/App.tsx';
import { ErrorBoundary } from './_ui/components/ErrorBoundary.tsx';
import { CONFIG } from './constants/config.constants';

// Create logger at module level for bootstrap errors
const bootstrapLogger = createLoggerService(createDefaultLogger());

/**
 * Initialize all application services
 * @returns Configured service instances
 */
const initializeServices = (): Services => {
    const logger: Logger = createDefaultLogger();
    const httpClient: HttpClient = createDefaultHttpClient();

    const loggerService = createLoggerService(logger);

    const httpService = createHttpService(httpClient);
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
        <StorageProvider>
            <React.StrictMode>
                <ServicesProvider services={services}>
                    <ErrorBoundary loggerService={services.loggerService}>
                        <App />
                    </ErrorBoundary>
                </ServicesProvider>
            </React.StrictMode>
        </StorageProvider>,
    );
};

/**
 * Handle the case when a root element cannot be found
 * @param elementId ID of the missing root element
 */
const handleMissingRootElement = (elementId: string): void => {
    bootstrapLogger.error(CONFIG.ERROR_MESSAGES.ROOT_NOT_FOUND(elementId));
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
