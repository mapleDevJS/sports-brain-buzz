import { createQuestionState } from '../_lib/createQuestionState.ts';
import { getApiErrorMessage } from '../_lib/getApiErrorMessages.ts';
import { retryWithBackoff } from '../_lib/retryWithBackoff.ts';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { localStorage } from '../_services/store/storageAdapter.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { ResponseCode } from '../types/response-code.enum.ts';
import { QuizStorageService } from './ports.ts';
import { startTrivia } from './startTrivia.ts';

// Each IP can only access the API once every 5 seconds.
const API_RATE_LIMIT = 5000;
const GENERIC_ERROR_MESSAGE = 'Failed to fetch quiz questions. Please try again.';

export const fetchQuestions = async (
    token: string,
    quizStorage: QuizStorageService,
): Promise<void> => {
    const { setError, setQuestions } = quizStorage;

    try {
        const { data } = await quizApiService.fetchQuestions(
            TOTAL_QUESTIONS,
            Difficulty.MEDIUM,
            token,
        );

        const { response_code: responseCode, results } = data;

        if (!Array.isArray(results)) {
            setError(GENERIC_ERROR_MESSAGE);
            return;
        }

        switch (responseCode) {
            case ResponseCode.Success:
                setQuestions(results.map(createQuestionState));
                break;
            case ResponseCode.Empty:
            case ResponseCode.NotFound:
                localStorage.removeItem('sessionToken');
                await startTrivia({ quizStorage });
                break;
            case ResponseCode.RateLimit:
                await retryWithBackoff(() => startTrivia({ quizStorage }), {
                    initialDelay: API_RATE_LIMIT,
                    maxRetries: 3,
                });
                break;
            default:
                setError(getApiErrorMessage(responseCode));
                break;
        }
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        setError(GENERIC_ERROR_MESSAGE);
    }
};
