import { delay } from '../_lib/delay.ts';
import { localStorage } from '../_services/store/storageAdapter.ts';
import { fetchQuestions } from './fetchQuestions.ts';
import { fetchToken } from './fetchToken.ts';
import { QuizStorageService } from './ports.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
};

export const startTrivia = async (
    { quizStorage }: Dependencies,
    delayInMs?: number,
): Promise<void> => {
    // Start the quiz using the provided storage service
    quizStorage.startQuiz();

    // Get sessionToken from local storage
    let sessionToken = localStorage.getItem('sessionToken');

    // Add an artificial delay if specified
    if (delayInMs) {
        await delay(delayInMs);
    }

    // Fetch a new token if not present
    if (!sessionToken) {
        await fetchToken(quizStorage);
        sessionToken = localStorage.getItem('sessionToken'); // Retrieve updated token
    }

    // Fetch questions if a valid session token exists
    if (sessionToken) {
        await fetchQuestions(sessionToken, quizStorage);
    }
};
