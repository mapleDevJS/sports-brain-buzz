import { createQuestionState } from '../_lib/createQuestionState.ts';
import { getApiErrorMessage } from '../_lib/get-api-error-messages.ts';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { localStorage } from '../_services/store/storageAdapter.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { QuestionsState } from '../types/question-state.type.ts';
import { ResponseCode } from '../types/response-code.enum.ts';

export const fetchQuestions = async (
    token: string,
    setError: (message: string) => void,
    startQuiz: () => void,
    setQuestions: (questionState: QuestionsState[]) => void,
): Promise<void> => {
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
                startQuiz();
                break;
            default:
                throw new Error(`${getApiErrorMessage(responseCode)}`);
        }
    } catch (error) {
        console.log(error);
        setError('Failed to fetch quiz questions. Please try again.');
    }
};
