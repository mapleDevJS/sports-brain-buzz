import { createContext } from 'react';

import { LoggerService, QuizApiService } from '../../_application/ports.ts';

export interface Services {
    loggerService: LoggerService;
    quizApiService: QuizApiService;
}

export const ServicesContext = createContext<Services | null>(null);
