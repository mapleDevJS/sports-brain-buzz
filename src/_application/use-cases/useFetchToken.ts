import { useCallback } from 'react';

import { ERROR_MESSAGE_BASE } from '../../_lib/get-api-error-messages';
import { useServices } from '../../_services/di/useServices';
import { useLocalStorage, useQuizStorage } from '../../_services/storage/storageAdapters';

const SESSION_TOKEN_KEY = 'sessionToken';
const TOKEN_ERROR_MESSAGE = `${ERROR_MESSAGE_BASE} Please try again.`;

export const useFetchToken = () => {
    const { quizApiService } = useServices();
    const { setFetchTokenError } = useQuizStorage();
    const localStorage = useLocalStorage();

    return useCallback(async (): Promise<void> => {
        try {
            const {
                data: { token },
            } = await quizApiService.fetchToken();
            localStorage.setItem(SESSION_TOKEN_KEY, token);
        } catch (error) {
            setFetchTokenError(TOKEN_ERROR_MESSAGE);
        }
    }, [quizApiService, localStorage, setFetchTokenError]);
};
