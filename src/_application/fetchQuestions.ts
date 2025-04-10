import { createQuestionState } from '../_lib/createQuestionState.ts';
import { getApiErrorMessage } from '../_lib/getApiErrorMessages.ts';
import { retryWithBackoff } from '../_lib/retryWithBackoff.ts';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { ResponseCode } from '../types/response-code.enum.ts';
import { LocalStorageService, LoggerService, QuizStorageService } from './ports.ts';
// import { startTrivia } from './startTrivia.ts';

// Each IP can only access the API once every 5 seconds.
const RATE_LIMIT_MS = 5000;
const GENERIC_ERROR_MESSAGE = 'Failed to fetch quiz questions. Please try again.';

export const fetchQuestions = async (
    token: string,
    quizStorage: QuizStorageService,
    localStorage: LocalStorageService,
    loggerService: LoggerService,
): Promise<void> => {
    const { setError, setQuestions } = quizStorage;

    try {
        const { data } = await quizApiService.fetchQuestions(
            TOTAL_QUESTIONS,
            Difficulty.MEDIUM,
            token,
        );

        const { response_code: responseCode, results } = data;

        switch (responseCode) {
            case ResponseCode.Success:
                setQuestions(results.map(createQuestionState));
                break;
            case ResponseCode.Empty:
            case ResponseCode.NotFound:
                localStorage.removeItem('sessionToken');
                await fetchQuestions(token, quizStorage, localStorage, loggerService);
                break;
            case ResponseCode.RateLimit:
                loggerService.warn('Rate limit exceeded. Retrying after delay...');
                await retryWithBackoff(
                    () => fetchQuestions(token, quizStorage, localStorage, loggerService),
                    {
                        initialDelay: RATE_LIMIT_MS,
                        maxRetries: 1,
                    },
                );
                break;
            default:
                setError(getApiErrorMessage(responseCode));
                break;
        }
    } catch (error) {
        loggerService.error('Error fetching quiz questions:', error);
        setError(GENERIC_ERROR_MESSAGE);
    }
};
