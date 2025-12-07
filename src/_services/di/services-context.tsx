import { createContext } from 'react';

import { LoggerService, QuizApiService } from '../../_application/ports/ports';

export interface Services {
    loggerService: LoggerService;
    quizApiService: QuizApiService;
}

export const ServicesContext = createContext<Services | null>(null);
