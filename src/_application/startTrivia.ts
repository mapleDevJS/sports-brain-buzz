// import { delay } from '../_lib/delay.ts';
// import { fetchToken } from './fetchToken.ts';
import { LocalStorageService, LoggerService, QuizStorageService } from './ports.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
    localStorage: LocalStorageService;
    loggerService: LoggerService;
    fetchQuestions: (
        token: string,
        quizStorage: QuizStorageService,
        localStorage: LocalStorageService,
        loggerService: LoggerService,
    ) => Promise<void>;
    fetchToken: (
        quizStorage: QuizStorageService,
        localStorage: LocalStorageService,
    ) => Promise<void>;
};

export const startTrivia = async (
    { quizStorage, localStorage, loggerService, fetchQuestions, fetchToken }: Dependencies,
    // delayInMs?: number,
): Promise<void> => {
    // Start the quiz using the provided storage service
    quizStorage.startQuiz();

    // Get sessionToken from local storage
    let sessionToken = localStorage.getItem('sessionToken');

    // Add an artificial delay if specified
    // if (delayInMs) {
    //     await delay(delayInMs);
    // }

    // Fetch a new token if not present
    if (!sessionToken) {
        await fetchToken(quizStorage, localStorage);
        sessionToken = localStorage.getItem('sessionToken'); // Retrieve updated token
    }

    // Fetch questions if a valid session token exists
    if (sessionToken) {
        await fetchQuestions(sessionToken, quizStorage, localStorage, loggerService);
    }
};
