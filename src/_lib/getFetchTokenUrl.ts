import { API_COMMANDS, API_ENDPOINTS, API_URL } from '../constants/api.constants';
import { TokenUrlError } from './errors';
import {
    createApiUrl,
    createApiUrlWithErrorHandling,
    normalizeBaseUrl,
    validateConfig,
} from './url';

export const getFetchTokenUrl = (): string => {
    return createApiUrlWithErrorHandling(() => {
        validateConfig();

        const baseUrl = normalizeBaseUrl(API_URL);
        const command: typeof API_COMMANDS.REQUEST = API_COMMANDS.REQUEST;

        const url = createApiUrl(baseUrl, API_ENDPOINTS.TOKEN, {
            command,
        });

        return url.toString();
    }, TokenUrlError);
};
