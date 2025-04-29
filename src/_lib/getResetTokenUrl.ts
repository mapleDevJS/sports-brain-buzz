import DOMPurify from 'dompurify';

import { API_COMMANDS, API_ENDPOINTS, API_URL } from '../constants/api.constants';
import { API_ERRORS } from '../constants/errors.constants.ts';
import { TokenUrlError } from '../types/errors-types.ts';
import { createApiUrlWithErrorHandling } from './url';

interface TokenValidationConfig {
    readonly minLength: number;
    readonly maxLength: number;
}

const TOKEN_VALIDATION_CONFIG: TokenValidationConfig = Object.freeze({
    minLength: 32,
    maxLength: 64,
});

const validateAndSanitizeToken = (token: string): string => {
    const sanitizedToken = DOMPurify.sanitize(token?.trim() ?? '');
    if (
        !sanitizedToken ||
        sanitizedToken.length < TOKEN_VALIDATION_CONFIG.minLength ||
        sanitizedToken.length > TOKEN_VALIDATION_CONFIG.maxLength
    ) {
        throw new TokenUrlError(API_ERRORS.INVALID_TOKEN.code, 'Invalid token format or length');
    }
    return sanitizedToken;
};

export const getResetTokenUrl = (token: string): string => {
    return createApiUrlWithErrorHandling(() => {
        const validatedToken = validateAndSanitizeToken(token);

        const url = new URL(API_ENDPOINTS.TOKEN, API_URL);
        url.searchParams.append('command', API_COMMANDS.RESET);
        url.searchParams.append('token', validatedToken);

        return url.toString();
    });
};
