import { sleep } from 'radash';

import { LocalStorageService, QuizStorageService } from '../ports/ports';

export type TriviaServiceDependencies = {
    quizStorage: QuizStorageService;
    localStorage: LocalStorageService;
};

export type TriviaActions = {
    shouldStartQuiz: boolean;
    shouldWait: number;
    shouldFetchToken: boolean;
    shouldFetchQuestions: boolean;
};

// Token storage key
export const SESSION_TOKEN_KEY = 'sessionToken';

// Pure function that determines what actions need to be taken
export const calculateTriviaActions = (token: string | null, delayInMs?: number): TriviaActions => {
    return {
        shouldStartQuiz: true,
        shouldWait: delayInMs ? delayInMs : 0,
        shouldFetchToken: !token,
        shouldFetchQuestions: true,
    };
};

// Main function that orchestrates the trivia startup flow
export const startTrivia = async (
    deps: TriviaServiceDependencies,
    fetchQuestions: (token: string, retryCallback?: (delayInMs?: number) => void) => Promise<void>,
    fetchToken: () => Promise<void>,
    delayInMs?: number,
) => {
    const { quizStorage, localStorage } = deps;

    // Get the current token state
    const token = localStorage.getItem(SESSION_TOKEN_KEY);

    // Determine what actions to take (pure computation)
    const actions = calculateTriviaActions(token, delayInMs);

    // Execute the side effects based on the pure calculation
    if (actions.shouldStartQuiz) {
        quizStorage.startQuiz();
    }

    if (actions.shouldWait > 0) {
        await sleep(actions.shouldWait);
    }

    if (actions.shouldFetchToken) {
        await fetchToken();
    }

    // Handle fetching questions with retry capability
    if (actions.shouldFetchQuestions) {
        const currentToken = localStorage.getItem(SESSION_TOKEN_KEY);
        if (currentToken) {
            // Pass the function itself as the retry callback
            const retryCallback = (retryDelayInMs?: number) =>
                startTrivia(deps, fetchQuestions, fetchToken, retryDelayInMs);

            await fetchQuestions(currentToken, retryCallback);
        }
    }
};
