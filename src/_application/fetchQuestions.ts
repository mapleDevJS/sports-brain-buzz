import { createQuestionState } from '../_lib/createQuestionState.ts';
import { getApiErrorMessage } from '../_lib/get-api-error-messages.ts';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { localStorage } from '../_services/store/storageAdapter.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { ResponseCode } from '../types/response-code.enum.ts';
import { QuizStorageService } from './ports.ts';
import { startTrivia } from './startTrivia.ts';

// Each IP can only access the API once every 5 seconds.
const API_RATE_LIMIT = 5000;

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
        const responseCode: ResponseCode = data.response_code;

        switch (responseCode) {
            case ResponseCode.Success:
                setQuestions(data.results.map(createQuestionState));
                break;
            case ResponseCode.Empty:
            case ResponseCode.NotFound:
                localStorage.removeItem('sessionToken');
                await startTrivia({ quizStorage });
                break;
            case ResponseCode.RateLimit:
                await startTrivia({ quizStorage }, API_RATE_LIMIT);
                break;
            default:
                throw new Error(`${getApiErrorMessage(responseCode)}`);
        }
    } catch (error) {
        console.log(error);
        setError('Failed to fetch quiz questions. Please try again.');
    }
};
