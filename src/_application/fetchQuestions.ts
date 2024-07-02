import { Dispatch } from 'react';
import { ActionType } from '../store/action-type.type.ts';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { createQuestionState } from '../_lib/createQuestionState.ts';
import { ResponseCode } from '../types/response-code.enum.ts';
import { fetchToken } from './fetchToken.ts';
import { ActionTypes } from '../store/action-types.enum.ts';

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

        if (responseCode === ResponseCode.Empty) {
            await fetchToken(dispatch);
            return;
        }

        const payload = data.results.map(createQuestionState);
        dispatch({ type: ActionTypes.SET_QUESTIONS, payload });
    } catch (error) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: 'Failed to fetch quiz questions. Please try again.',
        });
    }
};
