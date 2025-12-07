import { useCallback } from 'react';

import { ERROR_MESSAGE_BASE } from '../../_lib/get-api-error-messages.ts';
import { useServices } from '../../_services/di/useServices.ts';
import { useLocalStorage, useQuizStorage } from '../../_services/storage/storageAdapters.ts';

/** @constant {string} Local storage key for the session token */
const SESSION_TOKEN_KEY = 'sessionToken';

/** @constant {string} Error message displayed when token fetch fails */
const TOKEN_ERROR_MESSAGE = `${ERROR_MESSAGE_BASE} Please try again.`;

/**
 * React hook for fetching a new session token from the trivia API
 *
 * This hook provides functionality to request a new session token, which is required
 * for fetching quiz questions. The session token:
 * - Ensures unique questions per quiz session
 * - Prevents duplicate questions within a session
 * - Expires after a certain period or number of requests
 * - Is automatically stored in local storage for reuse
 *
 * The hook returns an async callback that fetches a new token and stores it.
 * If the fetch fails, the quiz state is updated with an error message.
 *
 * @returns {Function} Async callback function to fetch and store a session token
 *
 * @example
 * ```typescript
 * function StartQuizComponent() {
 *   const fetchToken = useFetchToken();
 *
 *   const handleStartQuiz = async () => {
 *     await fetchToken();
 *     // Token is now stored in localStorage
 *     // Can proceed to fetch questions
 *   };
 *
 *   return <button onClick={handleStartQuiz}>Start Quiz</button>;
 * }
 * ```
 *
 * @see {@link useFetchQuestions} for using the token to fetch questions
 * @see {@link SESSION_TOKEN_KEY} for the storage key
 */
export const useFetchToken = () => {
    const { quizApiService } = useServices();
    const { setFetchTokenError } = useQuizStorage();
    const localStorage = useLocalStorage();

    return useCallback(async (): Promise<void> => {
        try {
            const {
                data: { token },
            } = await quizApiService.fetchToken();
            localStorage.setItem(SESSION_TOKEN_KEY, token);
        } catch (error) {
            setFetchTokenError(TOKEN_ERROR_MESSAGE);
        }
    }, [quizApiService, localStorage, setFetchTokenError]);
};
