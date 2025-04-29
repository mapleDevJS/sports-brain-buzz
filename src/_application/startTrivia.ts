import { sleep } from 'radash';

import { fetchQuestions } from './fetchQuestions.ts';
import { fetchToken } from './fetchToken.ts';
import { LocalStorageService, LoggerService, QuizApiService, QuizStorageService } from './ports.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
    localStorage: LocalStorageService;
    quizApiService: QuizApiService;
    loggerService: LoggerService;
};

export const startTrivia = async (
    { quizStorage, localStorage, quizApiService, loggerService }: Dependencies,
    delayInMs?: number,
) => {
    const { startQuiz } = quizStorage;

    startQuiz();
    const token = localStorage.getItem('sessionToken');

    if (delayInMs) await sleep(delayInMs);

    if (!token) {
        await fetchToken({ quizStorage, localStorage, quizApiService });
    }
    const existingToken = localStorage.getItem('sessionToken');
    if (existingToken) {
        await fetchQuestions(existingToken, {
            quizStorage,
            localStorage,
            quizApiService,
            loggerService,
        });
    }
};
