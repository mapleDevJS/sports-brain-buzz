import React from 'react';
import { createRoot } from 'react-dom/client';

import { HttpClient } from './_application/ports.ts';
import { createHttpService } from './_services/http.service';
import { createDefaultHttpClient } from './_services/http-client.service.ts';
import { createDefaultLogger, createLoggerService } from './_services/logger.service.ts';
import { createQuizApiService } from './_services/quiz-api.service';
import { ServicesProvider } from './_services/store/services';
import { Services } from './_services/store/services-context';
import { Provider } from './_services/store/store';
import App from './_ui/App';
import { CONFIG } from './constants/config.constants.ts';

const initializeServices = (): Services => {
    const defaultClient: HttpClient = createDefaultHttpClient();
    const defaultLogger = createDefaultLogger();
    const loggerService = createLoggerService(defaultLogger);
    const httpService = createHttpService(defaultClient);
    const quizApiService = createQuizApiService(httpService);

    return {
        loggerService,
        quizApiService,
    };
};

const renderApp = (rootElement: HTMLElement, services: Services): void => {
    const root = createRoot(rootElement);
    root.render(
        <Provider>
            <React.StrictMode>
                <ServicesProvider services={services}>
                    <App />
                </ServicesProvider>
            </React.StrictMode>
        </Provider>,
    );
};

const rootElement = document.getElementById(CONFIG.ROOT_ELEMENT_ID);

if (rootElement) {
    const services = initializeServices();
    renderApp(rootElement, services);
} else {
    console.error(CONFIG.ERROR_MESSAGES.ROOT_NOT_FOUND(CONFIG.ROOT_ELEMENT_ID));
}
