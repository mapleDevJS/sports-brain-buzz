import { createQuestionState } from '../_lib/createQuestionState.ts';
import { getApiErrorMessage } from '../_lib/get-api-error-messages.ts';
import { API_RATE_LIMIT } from '../constants/api.constants.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { ResponseCode } from '../types/response-code.enum.ts';
import { LocalStorageService, LoggerService, QuizApiService, QuizStorageService } from './ports.ts';
import { startTrivia } from './startTrivia.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
    localStorage: LocalStorageService;
    quizApiService: QuizApiService;
    loggerService: LoggerService;
};

export const fetchQuestions = async (
    token: string,
    { quizStorage, quizApiService, loggerService }: Dependencies,
): Promise<void> => {
    const { setError, setQuestions } = quizStorage;
    try {
        const { data } = await quizApiService.fetchQuestions(
            TOTAL_QUESTIONS,
            Difficulty.MEDIUM,
            token,
        );
        const responseCode: ResponseCode = data.response_code;

        switch (responseCode) {
            case ResponseCode.Success:
                setQuestions(data.results.map(createQuestionState));
                break;
            case ResponseCode.Empty:
            case ResponseCode.NotFound:
                localStorage.removeItem('sessionToken');
                await startTrivia({ quizStorage, localStorage, quizApiService, loggerService });
                break;
            case ResponseCode.RateLimit:
                await startTrivia(
                    { quizStorage, localStorage, quizApiService, loggerService },
                    API_RATE_LIMIT,
                );
                break;
            default:
                loggerService.error(getApiErrorMessage(responseCode));
                setError('Failed to fetch quiz questions. Please try again.');
                return;
        }
    } catch (error) {
        loggerService.error('', error);
        setError('Failed to fetch quiz questions. Please try again.');
    }
};
