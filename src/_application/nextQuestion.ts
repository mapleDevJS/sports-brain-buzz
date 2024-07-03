import { Dispatch } from 'react';
import { ActionTypes } from '../_services/store/action-types.enum.ts';
import { ActionType } from '../_services/store/action-type.type.ts';

export const nextQuestion = (dispatch: Dispatch<ActionType>) => {
    dispatch({ type: ActionTypes.NEXT_QUESTION });
};
