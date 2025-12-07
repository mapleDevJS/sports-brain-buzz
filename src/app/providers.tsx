'use client';

import { ReactNode } from 'react';

import { HttpClient, Logger } from '../_application/ports/ports';
import { createQuizApiService } from '../_services/api/quiz-api.service';
import { Services } from '../_services/di/services-context';
import { ServicesProvider } from '../_services/di/services';
import { createDefaultHttpClient } from '../_services/http/http.client';
import { createHttpService } from '../_services/http/http.service';
import { createLoggerService } from '../_services/logger/logger.service';
import { createDefaultLogger } from '../_services/logger/logger';
import { StorageProvider } from '../_services/storage/quiz/quiz-store';

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

const services = initializeServices();

export function Providers({ children }: { children: ReactNode }) {
    return (
        <StorageProvider>
            <ServicesProvider services={services}>{children}</ServicesProvider>
        </StorageProvider>
    );
}
