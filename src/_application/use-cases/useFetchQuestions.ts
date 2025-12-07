import { useCallback } from 'react';

import { transformToQuestionState } from '../../_domain/mappers/question.mapper.ts';
import { getApiErrorMessage } from '../../_lib/get-api-error-messages.ts';
import { useServices } from '../../_services/di/useServices.ts';
import { useLocalStorage, useQuizStorage } from '../../_services/storage/storageAdapters.ts';
import { API_RATE_LIMIT } from '../../constants/api.constants.ts';
import { TOTAL_QUESTIONS } from '../../constants/app.constants.ts';
import { Difficulty } from '../../types/difficulty.enum.ts';
import { ResponseCode } from '../../types/response-code.enum.ts';
import { QuestionRdo } from '../ports/ports.ts';

/** @constant {string} Error message displayed to user when question fetch fails */
const FETCH_ERROR_MESSAGE = 'Failed to fetch quiz questions. Please try again.';

/** @constant {string} Local storage key for session token */
const SESSION_TOKEN_KEY = 'sessionToken';

/**
 * React hook for fetching quiz questions from the API with retry logic
 *
 * This hook encapsulates the business logic for fetching trivia questions:
 * - Fetches questions using a session token
 * - Handles API response codes (success, rate limit, token expiration, etc.)
 * - Implements automatic retry on rate limiting with configurable delays
 * - Transforms raw API responses into application state
 * - Manages error states and user feedback
 *
 * The hook returns a callback function that can be invoked with a session token
 * and an optional retry callback for handling failures.
 *
 * @returns {Function} Async callback function to fetch questions
 * @returns {string} callback.token - Session token for API authentication
 * @returns {Function} [callback.retryCallback] - Optional callback for retry on failure
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const fetchQuestions = useFetchQuestions();
 *
 *   // Fetch questions with a token
 *   await fetchQuestions('abc123');
 *
 *   // Fetch with retry callback
 *   const retry = (delayMs) => {
 *     console.log(`Retrying after ${delayMs}ms`);
 *     // Retry logic here
 *   };
 *   await fetchQuestions('abc123', retry);
 * }
 * ```
 *
 * @see {@link ResponseCode} for API response codes
 * @see {@link transformToQuestionState} for data transformation
 */
export const useFetchQuestions = () => {
    const { quizApiService, loggerService } = useServices();
    const quizStorage = useQuizStorage();
    const localStorage = useLocalStorage();

    const handleFetchError = useCallback(
        (error: unknown) => {
            loggerService.error('', error);
            quizStorage.setError(FETCH_ERROR_MESSAGE);
        },
        [loggerService, quizStorage],
    );

    const handleResponseCode = useCallback(
        (
            responseCode: ResponseCode,
            data: QuestionRdo,
            retryCallback?: (delayInMs?: number) => void,
        ) => {
            const { setError, setQuestions } = quizStorage;

            switch (responseCode) {
                case ResponseCode.Success:
                    setQuestions(data.results.map(transformToQuestionState));
                    break;
                case ResponseCode.Empty:
                case ResponseCode.NotFound:
                    localStorage.removeItem(SESSION_TOKEN_KEY);
                    if (retryCallback) retryCallback();
                    break;
                case ResponseCode.RateLimit:
                    if (retryCallback) retryCallback(API_RATE_LIMIT);
                    break;
                default:
                    loggerService.error(getApiErrorMessage(responseCode));
                    setError(FETCH_ERROR_MESSAGE);
                    return;
            }
        },
        [quizStorage, localStorage, loggerService],
    );

    return useCallback(
        async (token: string, retryCallback?: (delayInMs?: number) => void): Promise<void> => {
            try {
                const { data } = await quizApiService.fetchQuestions(
                    TOTAL_QUESTIONS,
                    Difficulty.MEDIUM,
                    token,
                );

                handleResponseCode(data.response_code, data, retryCallback);
            } catch (error) {
                handleFetchError(error);
            }
        },
        [quizApiService, handleResponseCode, handleFetchError],
    );
};
