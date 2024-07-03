import { Dispatch } from 'react';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { createQuestionState } from '../_lib/createQuestionState.ts';
import { ResponseCode } from '../types/response-code.enum.ts';
import { storageService } from '../_services/storageAdapter.ts';
import { getApiErrorMessage } from '../_lib/get-api-error-messages.ts';
import { QuestionRdo } from './ports.ts';
import { ActionType } from '../_services/store/action-type.type.ts';
import { ActionTypes } from '../_services/store/action-types.enum.ts';

const handleSuccessResponse = (data: QuestionRdo, dispatch: Dispatch<ActionType>): void => {
    const questionsState = data.results.map(createQuestionState);
    dispatch({ type: ActionTypes.SET_QUESTIONS, payload: questionsState });
};

const handleEmptyOrNotFoundResponse = (dispatch: Dispatch<ActionType>): void => {
    storageService.removeItem('sessionToken');
    dispatch({ type: ActionTypes.START_QUIZ });
};

const handleError = (dispatch: Dispatch<ActionType>, message: string): void => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: message });
};

export const fetchQuestions = async (
    token: string,
    dispatch: Dispatch<ActionType>,
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
                handleSuccessResponse(data, dispatch);
                break;
            case ResponseCode.Empty:
            case ResponseCode.NotFound:
                handleEmptyOrNotFoundResponse(dispatch);
                break;
            default:
                throw new Error(`${getApiErrorMessage(responseCode)}`);
        }
    } catch (error) {
        handleError(dispatch, 'Failed to fetch quiz questions. Please try again.');
    }
};
