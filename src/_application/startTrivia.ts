import { Dispatch } from 'react';
import { ActionTypes } from '../_services/store/action-types.enum.ts';
import { storageService } from '../_services/storageAdapter.ts';
import { fetchToken } from './fetchToken.ts';
import { fetchQuestions } from './fetchQuestions.ts';
import { ActionType } from '../_services/store/action-type.type.ts';

export const startTrivia = async (dispatch: Dispatch<ActionType>) => {
    dispatch({ type: ActionTypes.START_QUIZ });
    const token = storageService.getItem('sessionToken');

    if (!token) {
        await fetchToken(dispatch);
    }
    const existingToken = storageService.getItem('sessionToken');
    if (existingToken) {
        await fetchQuestions(existingToken, dispatch);
    }
};
