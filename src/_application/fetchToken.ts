import { Dispatch } from 'react';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { ActionType } from '../store/action-type.type.ts';
import { getFetchTokenErrorMessage } from '../_lib/get-fetch-token-error-messages.ts';
import { ActionTypes } from '../store/action-types.enum.ts';

export const fetchToken = async (dispatch: Dispatch<ActionType>): Promise<string | null> => {
    try {
        const { data } = await quizApiService.fetchToken();

        const token = data.token;
        dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
        return token;
    } catch (error) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: `${getFetchTokenErrorMessage()} Please try again.`,
        });
        return null;
    }
};
