import { Dispatch } from 'react';
import { ActionType } from '../store/action-type.type.ts';
import { fetchToken } from './fetchToken.ts';
import { storageService } from '../_services/storageAdapter.ts';

export const retrieveAndStoreToken = async (
    dispatch: Dispatch<ActionType>,
    tokenKey: string,
): Promise<string | null> => {
    const token = await fetchToken(dispatch);
    if (token) {
        storageService.setItem(tokenKey, token);
    }
    return token;
};
