import createError from 'http-errors';
import queryString from 'query-string';
import urljoin from 'url-join';

export interface ApiUrlOptions {
    command?: string;
    [key: string]: string | undefined;
}

export const createApiUrl = (
    baseUrl: string,
    endpoint: string,
    options: ApiUrlOptions = {},
): URL => {
    if (!baseUrl?.trim()) {
        throw createError(500, 'Missing API URL');
    }

    const cleanBaseUrl = baseUrl.trim();
    const fullUrl = urljoin(cleanBaseUrl, endpoint);

    const queryParams = Object.fromEntries(
        Object.entries(options).filter(([, value]) => value !== undefined),
    );

    return new URL(`${fullUrl}?${queryString.stringify(queryParams)}`);
};

export const createApiUrlWithErrorHandling = (urlCreator: () => string): string => {
    try {
        return urlCreator();
    } catch (error) {
        throw createError(
            500,
            `URL creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
};
