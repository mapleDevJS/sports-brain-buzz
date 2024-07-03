import { Dispatch } from 'react';
import { ActionType } from '../store/action-type.type.ts';
import { storageService } from '../_services/storageAdapter.ts';
import { retrieveAndStoreToken } from './retrieveAndStoreToken.ts';

const TOKEN_KEY = 'sessionToken';

export const getToken = async (dispatch: Dispatch<ActionType>): Promise<string | null> => {
    const existingToken = storageService.getItem(TOKEN_KEY);

    return existingToken || (await retrieveAndStoreToken(dispatch, TOKEN_KEY));
};
