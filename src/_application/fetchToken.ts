import { Dispatch } from 'react';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { ActionType } from '../_services/store/action-type.type.ts';
import { getApiErrorMessage } from '../_lib/get-api-error-messages.ts';
import { ActionTypes } from '../_services/store/action-types.enum.ts';
import { storageService } from '../_services/storageAdapter.ts';

export const fetchToken = async (dispatch: Dispatch<ActionType>): Promise<void> => {
    try {
        const { data } = await quizApiService.fetchToken();

        const token = data.token;
        storageService.setItem('sessionToken', token);
        dispatch({ type: ActionTypes.SET_TOKEN });
        // return token;
    } catch (error) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: `${getApiErrorMessage()} Please try again.`,
        });
    }
};
