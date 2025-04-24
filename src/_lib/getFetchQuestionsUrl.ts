import DOMPurify from 'dompurify';

import { API_URL, CATEGORY_ID } from '../constants/api.constants';
import { Difficulty } from '../types/difficulty.enum';
import { API_ERRORS, QuizApiError } from './errors';
import { createApiUrlWithErrorHandling, validateConfig } from './url';

interface ValidationConfig {
    readonly minAmount: number;
    readonly maxAmount: number;
    readonly minTokenLength: number;
    readonly maxTokenLength: number;
    readonly allowedProtocols: readonly string[];
    readonly maxParamLength: number;
}

const VALIDATION_CONFIG: ValidationConfig = Object.freeze({
    minAmount: 1,
    maxAmount: 50,
    minTokenLength: 32,
    maxTokenLength: 64,
    allowedProtocols: ['https:'] as const,
    maxParamLength: 1024,
});

interface ValidatedParams {
    readonly amount: number;
    readonly difficulty: Difficulty;
    readonly token: string;
    readonly category: number;
}

const isDifficulty = (value: unknown): value is Difficulty => {
    return Object.values(Difficulty).includes(value as Difficulty);
};

const validateAndSanitizeParams = (
    amount: number,
    difficulty: Difficulty,
    token: string,
): ValidatedParams => {
    if (
        !Number.isInteger(amount) ||
        amount < VALIDATION_CONFIG.minAmount ||
        amount > VALIDATION_CONFIG.maxAmount
    ) {
        throw new QuizApiError(
            API_ERRORS.INVALID_AMOUNT.code,
            `Amount must be between ${VALIDATION_CONFIG.minAmount} and ${VALIDATION_CONFIG.maxAmount}`,
        );
    }

    const sanitizedToken = DOMPurify.sanitize(token?.trim() ?? '');
    if (
        !sanitizedToken ||
        sanitizedToken.length < VALIDATION_CONFIG.minTokenLength ||
        sanitizedToken.length > VALIDATION_CONFIG.maxTokenLength
    ) {
        throw new QuizApiError(API_ERRORS.INVALID_TOKEN.code, 'Invalid token format or length');
    }

    if (!isDifficulty(difficulty)) {
        throw new QuizApiError(API_ERRORS.INVALID_DIFFICULTY.code, 'Invalid difficulty level');
    }

    if (!Number.isInteger(CATEGORY_ID) || CATEGORY_ID <= 0) {
        throw new QuizApiError(API_ERRORS.INVALID_CATEGORY.code, 'Invalid category ID');
    }

    return {
        amount,
        difficulty,
        token: sanitizedToken,
        category: CATEGORY_ID,
    };
};

export const getFetchQuestionsUrl = (
    amount: number,
    difficulty: Difficulty,
    token: string,
): string => {
    return createApiUrlWithErrorHandling(() => {
        validateConfig();
        const validatedParams = validateAndSanitizeParams(amount, difficulty, token);

        const params = new URLSearchParams({
            amount: validatedParams.amount.toString(),
            category: validatedParams.category.toString(),
            difficulty: validatedParams.difficulty.toString(),
            type: 'multiple',
            token: validatedParams.token,
        });

        const url = new URL('api.php', API_URL);
        url.search = params.toString();
        return url.toString();
    }, QuizApiError);
};
