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

const FETCH_ERROR_MESSAGE = 'Failed to fetch quiz questions. Please try again.';
const SESSION_TOKEN_KEY = 'sessionToken';

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
