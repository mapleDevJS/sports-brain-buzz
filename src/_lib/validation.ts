import DOMPurify from 'dompurify';

import { QuizApiError } from '../types/errors-types';

export interface TokenValidationConfig {
    minLength: number;
    maxLength: number;
}

export const TOKEN_VALIDATION_CONFIG: TokenValidationConfig = {
    minLength: 10,
    maxLength: 100,
};

export const validateToken = (
    token: string | null | undefined,
    errorCode: string,
    errorMessage: string,
): string => {
    const sanitizedToken = DOMPurify.sanitize(token?.trim() ?? '');

    if (!sanitizedToken) {
        throw new QuizApiError(errorCode, errorMessage);
    }

    if (
        sanitizedToken.length < TOKEN_VALIDATION_CONFIG.minLength ||
        sanitizedToken.length > TOKEN_VALIDATION_CONFIG.maxLength
    ) {
        throw new QuizApiError(errorCode, `${errorMessage}: Invalid token length`);
    }

    return sanitizedToken;
};

export const validateAmount = (amount: number, min: number, max: number): void => {
    if (amount < min || amount > max) {
        throw new QuizApiError('INVALID_AMOUNT', `Amount must be between ${min} and ${max}`);
    }
};
