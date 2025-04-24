import DOMPurify from 'dompurify';

import { API_URL, CATEGORY_ID } from '../constants/api.constants';
import { Difficulty } from '../types/difficulty.enum';

// Enhanced type definitions
interface ValidationConfig {
    readonly minAmount: number;
    readonly maxAmount: number;
    readonly minTokenLength: number;
    readonly maxTokenLength: number;
    readonly allowedProtocols: readonly string[];
    readonly maxParamLength: number;
}

interface ApiError {
    readonly code: string;
    readonly message: string;
}

// Custom error class with error codes
export class QuizApiError extends Error {
    constructor(
        public readonly code: string,
        message: string,
    ) {
        super(message);
        this.name = 'QuizApiError';
    }
}

// Enhanced error handling with error codes
const API_ERRORS = {
    MISSING_API_URL: { code: 'CFG001', message: 'API_URL is not configured' },
    INVALID_AMOUNT: {
        code: 'VAL001',
        message: 'Amount must be a positive integer within allowed range',
    },
    INVALID_TOKEN: { code: 'VAL002', message: 'Invalid token format or length' },
    INVALID_DIFFICULTY: { code: 'VAL003', message: 'Invalid difficulty level' },
    INVALID_CATEGORY: { code: 'VAL004', message: 'Invalid category ID' },
    URL_CREATION_FAILED: { code: 'URL001', message: 'Failed to create API URL' },
} as const satisfies Record<string, ApiError>;

// Configuration with strict validation rules
const VALIDATION_CONFIG: ValidationConfig = Object.freeze({
    minAmount: 1,
    maxAmount: 50,
    minTokenLength: 32,
    maxTokenLength: 64,
    allowedProtocols: ['https:'] as const,
    maxParamLength: 1024,
});

// Type for validated parameters
interface ValidatedParams {
    readonly amount: number;
    readonly difficulty: Difficulty;
    readonly token: string;
    readonly category: number;
}

// Type guard for difficulty enum
const isDifficulty = (value: unknown): value is Difficulty => {
    return Object.values(Difficulty).includes(value as Difficulty);
};

// Enhanced parameter validation with strong typing
const validateAndSanitizeParams = (
    amount: number,
    difficulty: Difficulty,
    token: string,
): ValidatedParams => {
    // Validate amount
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

    // Validate token
    const sanitizedToken = DOMPurify.sanitize(token?.trim() ?? '');
    if (
        !sanitizedToken ||
        sanitizedToken.length < VALIDATION_CONFIG.minTokenLength ||
        sanitizedToken.length > VALIDATION_CONFIG.maxTokenLength
    ) {
        throw new QuizApiError(API_ERRORS.INVALID_TOKEN.code, 'Invalid token format or length');
    }

    // Validate difficulty
    if (!isDifficulty(difficulty)) {
        throw new QuizApiError(API_ERRORS.INVALID_DIFFICULTY.code, 'Invalid difficulty level');
    }

    // Validate category
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

// Validate API configuration
const validateConfig = (): void => {
    if (!API_URL?.trim()) {
        throw new QuizApiError(API_ERRORS.MISSING_API_URL.code, API_ERRORS.MISSING_API_URL.message);
    }
};

// Main function with enhanced error handling and type safety
export const getFetchQuestionsUrl = (
    amount: number,
    difficulty: Difficulty,
    token: string,
): string => {
    try {
        // Validate configuration
        validateConfig();

        // Validate and sanitize parameters
        const validatedParams = validateAndSanitizeParams(amount, difficulty, token);

        // Create URL parameters
        const params = new URLSearchParams({
            amount: validatedParams.amount.toString(),
            category: validatedParams.category.toString(),
            difficulty: validatedParams.difficulty.toString(),
            type: 'multiple',
            token: validatedParams.token,
        });

        // Create and return URL
        const url = new URL('api.php', API_URL);
        url.search = params.toString();
        return url.toString();
    } catch (error) {
        if (error instanceof QuizApiError) {
            throw error;
        }
        throw new QuizApiError(
            API_ERRORS.URL_CREATION_FAILED.code,
            `${API_ERRORS.URL_CREATION_FAILED.message}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
};
