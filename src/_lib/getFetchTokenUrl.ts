import { API_COMMANDS, API_ENDPOINTS, API_URL } from '../constants/api.constants.ts';
import { createApiUrl, createApiUrlWithErrorHandling } from './url.ts';

export const getFetchTokenUrl = (): string => {
    return createApiUrlWithErrorHandling(() => {
        const command: typeof API_COMMANDS.REQUEST = API_COMMANDS.REQUEST;

        const url = createApiUrl(API_URL, API_ENDPOINTS.TOKEN, {
            command,
        });

        return url.toString();
    });
};
