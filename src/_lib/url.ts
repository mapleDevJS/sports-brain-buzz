import { API_URL } from '../constants/api.constants';
import { API_ERRORS, BaseApiError } from './errors';

export type UrlCreator = () => string;
export type ApiErrorFactory<T extends BaseApiError> = new (code: string, message: string) => T;

export interface ApiUrlOptions {
    command?: string;
    [key: string]: string | undefined;
}

// Utility function for error message formatting
const formatErrorMessage = (baseMessage: string, error: unknown): string => {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return `${baseMessage}: ${errorMessage}`;
};

export const createApiUrlWithErrorHandling = <T extends BaseApiError>(
    urlCreator: UrlCreator,
    ErrorClass: ApiErrorFactory<T>,
): string => {
    try {
        return urlCreator();
    } catch (error) {
        if (error instanceof BaseApiError) {
            throw error;
        }

        const { code, message } = API_ERRORS.URL_CREATION_FAILED;
        throw new ErrorClass(
            code,
            formatErrorMessage(message, error)
        );
    }
};

export const validateConfig = (): void => {
    if (!API_URL?.trim()) {
        const { code, message } = API_ERRORS.MISSING_API_URL;
        throw new BaseApiError(code, message);
    }
};

export const normalizeBaseUrl = (url: string): string => {
    const trimmedUrl = url.trim();
    return trimmedUrl.endsWith('/') ? trimmedUrl.slice(0, -1) : trimmedUrl;
};

export const createApiUrl = (
    baseUrl: string,
    endpoint: string,
    options: ApiUrlOptions = {},
): URL => {
    const url = new URL(endpoint, normalizeBaseUrl(baseUrl));

    Object.entries(options)
        .filter(([, value]) => value !== undefined)
        .forEach(([key, value]) => {
            url.searchParams.append(key, value!);
        });

    return url;
};
