import DOMPurify from 'dompurify';

import { API_URL } from '../constants/api.constants';

// Enhanced type definitions
interface ValidationConfig {
    readonly maxLength: number;
    readonly allowedProtocols: readonly string[];
    readonly maxParamLength: number;
    readonly validEndpointPattern: RegExp;
}

interface ApiError {
    readonly code: string;
    readonly message: string;
}

// Improved constant definitions with better type safety
export const API_ENDPOINTS = {
    TOKEN: 'api_token.php',
} as const satisfies Record<string, string>;

export const API_COMMANDS = {
    REQUEST: 'request',
} as const satisfies Record<string, string>;

// Enhanced error handling with error codes
export const API_ERRORS = {
    MISSING_API_URL: { code: 'URL001', message: 'API_URL environment variable is not defined' },
    INVALID_API_URL: { code: 'URL002', message: 'API_URL is not a valid URL format' },
    INVALID_PROTOCOL: { code: 'URL003', message: 'API_URL must use HTTPS protocol' },
    EMPTY_URL: { code: 'URL004', message: 'URL cannot be empty' },
    URL_CREATION_FAILED: { code: 'URL005', message: 'Failed to create API URL' },
    INVALID_ENDPOINT: { code: 'URL006', message: 'Invalid endpoint format' },
    INVALID_PARAMS: { code: 'URL007', message: 'Invalid parameters provided' },
} as const satisfies Record<string, ApiError>;

// Improved configuration with strict validation rules
const URL_VALIDATION_CONFIG: ValidationConfig = Object.freeze({
    maxLength: 2083,
    allowedProtocols: ['https:'] as const,
    maxParamLength: 1024,
    validEndpointPattern: /^[a-zA-Z0-9_]+\.php$/,
});

// Enhanced error class with error codes
export class ApiUrlError extends Error {
    constructor(
        public readonly code: string,
        message: string,
    ) {
        super(message);
        this.name = 'ApiUrlError';
    }
}

// Type definitions with better type inference
type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
type ApiCommand = (typeof API_COMMANDS)[keyof typeof API_COMMANDS];
type SafeUrl = string & { readonly brand: unique symbol };

// Enhanced URL validation
const isValidUrl = (url: string): url is SafeUrl => {
    if (!url?.trim() || url.length > URL_VALIDATION_CONFIG.maxLength) {
        return false;
    }

    try {
        const parsedUrl = new URL(url);
        return URL_VALIDATION_CONFIG.allowedProtocols.includes(parsedUrl.protocol);
    } catch {
        return false;
    }
};

// Improved parameter validation with strong typing
const validateAndSanitizeParams = (params: Record<string, string>): Record<string, string> => {
    const sanitizedParams: Record<string, string> = {};

    for (const [key, value] of Object.entries(params)) {
        if (!key || !value || value.length > URL_VALIDATION_CONFIG.maxParamLength) {
            throw new ApiUrlError(
                API_ERRORS.INVALID_PARAMS.code,
                `Invalid parameter value for ${key}`,
            );
        }
        sanitizedParams[DOMPurify.sanitize(key)] = DOMPurify.sanitize(value);
    }

    return sanitizedParams;
};

// Enhanced URL normalization with better error handling
const normalizeBaseUrl = (url: string | null | undefined): SafeUrl => {
    if (!url?.trim()) {
        throw new ApiUrlError(API_ERRORS.EMPTY_URL.code, API_ERRORS.EMPTY_URL.message);
    }

    const normalized = url
        .trim()
        .replace(/([^:]\/)\/+/g, '$1')
        .replace(/\/+$/, '');

    if (!isValidUrl(normalized)) {
        throw new ApiUrlError(API_ERRORS.INVALID_API_URL.code, API_ERRORS.INVALID_API_URL.message);
    }

    return normalized as SafeUrl;
};

// Improved URL creation with additional validation
const createApiUrl = (
    baseUrl: SafeUrl,
    endpoint: ApiEndpoint,
    params: Record<string, string>,
): URL => {
    if (!URL_VALIDATION_CONFIG.validEndpointPattern.test(endpoint)) {
        throw new ApiUrlError(
            API_ERRORS.INVALID_ENDPOINT.code,
            API_ERRORS.INVALID_ENDPOINT.message,
        );
    }

    try {
        const safeParams = validateAndSanitizeParams(params);
        const url = new URL(`${baseUrl}/${endpoint}`);

        Object.entries(safeParams).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        return url;
    } catch (error) {
        throw new ApiUrlError(
            API_ERRORS.URL_CREATION_FAILED.code,
            `${API_ERRORS.URL_CREATION_FAILED.message}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
};

// Enhanced main function with better error handling and type safety
export const getFetchTokenUrl = (): string => {
    if (!API_URL) {
        throw new ApiUrlError(API_ERRORS.MISSING_API_URL.code, API_ERRORS.MISSING_API_URL.message);
    }

    const baseUrl = normalizeBaseUrl(API_URL);
    const command: ApiCommand = API_COMMANDS.REQUEST;

    const url = createApiUrl(baseUrl, API_ENDPOINTS.TOKEN, {
        command,
    });

    return url.toString();
};
