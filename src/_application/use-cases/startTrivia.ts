import { sleep } from '../../_lib/sleep.ts';
import { LocalStorageService, QuizStorageService } from '../ports/ports.ts';

/**
 * Service dependencies required for trivia game initialization
 * @interface TriviaServiceDependencies
 * @property {QuizStorageService} quizStorage - Quiz state management service
 * @property {LocalStorageService} localStorage - Browser local storage service for session tokens
 * @property {Function} fetchQuestions - Async function to fetch quiz questions with retry support
 * @property {Function} fetchToken - Async function to fetch a new session token from the API
 */
export type TriviaServiceDependencies = {
    quizStorage: QuizStorageService;
    localStorage: LocalStorageService;
    fetchQuestions: (token: string, retryCallback?: (delayInMs?: number) => void) => Promise<void>;
    fetchToken: () => Promise<void>;
};

/**
 * Actions to be performed during trivia initialization
 * @interface TriviaActions
 * @property {boolean} shouldStartQuiz - Whether to initialize quiz state
 * @property {number} shouldWait - Milliseconds to wait before fetching (for rate limiting)
 * @property {boolean} shouldFetchToken - Whether to fetch a new session token
 * @property {boolean} shouldFetchQuestions - Whether to fetch quiz questions
 */
export type TriviaActions = {
    shouldStartQuiz: boolean;
    shouldWait: number;
    shouldFetchToken: boolean;
    shouldFetchQuestions: boolean;
};

/**
 * Local storage key for the session token
 * @constant {string}
 */
export const SESSION_TOKEN_KEY = 'sessionToken';

/**
 * Determines what actions need to be taken to start the trivia game
 *
 * Pure function that calculates required actions based on current state.
 * Does not perform any side effects - only returns what should be done.
 *
 * @param {string | null} token - Current session token from local storage, or null if none exists
 * @param {number} [delayInMs] - Optional delay before fetching questions (for API rate limiting)
 * @returns {TriviaActions} Object describing which actions should be performed
 *
 * @example
 * ```typescript
 * // No token exists, need to fetch one
 * const actions = calculateTriviaActions(null);
 * // { shouldStartQuiz: true, shouldWait: 0, shouldFetchToken: true, shouldFetchQuestions: true }
 *
 * // Token exists, no delay needed
 * const actions = calculateTriviaActions('abc123');
 * // { shouldStartQuiz: true, shouldWait: 0, shouldFetchToken: false, shouldFetchQuestions: true }
 *
 * // Token exists, with rate limit delay
 * const actions = calculateTriviaActions('abc123', 5000);
 * // { shouldStartQuiz: true, shouldWait: 5000, shouldFetchToken: false, shouldFetchQuestions: true }
 * ```
 */
export const calculateTriviaActions = (token: string | null, delayInMs?: number): TriviaActions => {
    return {
        shouldStartQuiz: true,
        shouldWait: delayInMs ? delayInMs : 0,
        shouldFetchToken: !token,
        shouldFetchQuestions: true,
    };
};

/**
 * Orchestrates the complete trivia quiz startup flow
 *
 * This function coordinates all steps required to start a trivia game:
 * 1. Initializes quiz state to loading
 * 2. Waits for any specified delay (rate limiting)
 * 3. Fetches or reuses session token from local storage
 * 4. Fetches quiz questions with automatic retry on rate limit errors
 *
 * The function implements retry logic: if questions fail to fetch due to rate
 * limiting or token expiration, it can recursively retry with a delay.
 *
 * @param {TriviaServiceDependencies} deps - Service dependencies for quiz operations
 * @param {number} [delayInMs] - Optional delay in milliseconds before fetching questions
 * @returns {Promise<void>} Resolves when quiz is ready or rejects on unrecoverable error
 *
 * @example
 * ```typescript
 * // Start trivia immediately
 * await startTrivia({
 *   quizStorage,
 *   localStorage,
 *   fetchQuestions,
 *   fetchToken
 * });
 *
 * // Start trivia with 5 second delay (rate limiting)
 * await startTrivia({
 *   quizStorage,
 *   localStorage,
 *   fetchQuestions,
 *   fetchToken
 * }, 5000);
 * ```
 *
 * @see {@link calculateTriviaActions} for action determination logic
 * @see {@link SESSION_TOKEN_KEY} for token storage key
 */
export const startTrivia = async (
    deps: TriviaServiceDependencies,
    delayInMs?: number,
): Promise<void> => {
    const { quizStorage, localStorage, fetchQuestions, fetchToken } = deps;

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
            const retryCallback = (retryDelayInMs?: number) => startTrivia(deps, retryDelayInMs);

            await fetchQuestions(currentToken, retryCallback);
        }
    }
};
