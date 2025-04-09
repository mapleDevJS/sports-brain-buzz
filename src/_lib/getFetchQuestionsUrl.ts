import { API_URL, CATEGORY_ID } from '../constants/api.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';

// Default question type constant for API requests
const DEFAULT_QUESTION_TYPE = 'multiple';

/**
 * Ensures the provided value is a positive integer.
 * @param value The value to validate.
 * @param fieldName The name of the field (used in error messages).
 */
const ensurePositiveInteger = (value: number, fieldName: string): void => {
    if (value <= 0 || !Number.isInteger(value)) {
        throw new Error(`${fieldName} must be a positive integer.`);
    }
};

/**
 * Ensures the value is a non-empty string.
 * @param value The string to validate.
 * @param fieldName The name of the field (used in error messages).
 */
const ensureNonEmptyString = (value: string, fieldName: string): void => {
    if (!value || value.trim() === '') {
        throw new Error(`${fieldName} cannot be empty.`);
    }
};

/**
 * Ensures the provided difficulty is valid according to the Difficulty enum.
 * @param difficulty The difficulty value to validate.
 */
const ensureValidDifficulty = (difficulty: Difficulty): void => {
    if (!Object.values(Difficulty).includes(difficulty)) {
        throw new Error(
            `Invalid difficulty "${difficulty}". Allowed values: ${Object.values(Difficulty).join(', ')}`
        );
    }
};

/**
 * Generates the URL to fetch questions from the trivia API.
 *
 * @param amount - Number of questions to fetch (must be a positive integer).
 * @param difficulty - Difficulty level (enum of type `Difficulty`).
 * @param token - User or session token (must be a non-empty string).
 * @param extraParams - Optional additional query parameters (key-value pairs).
 * @returns A fully constructed API URL string.
 *
 * @example
 * ```typescript
 * const url = getFetchQuestionsUrl(10, Difficulty.Easy, "user-token", {
 *   tags: "history",
 *   language: "en",
 * });
 * ```
 */
export const getFetchQuestionsUrl = (
    amount: number,
    difficulty: Difficulty,
    token: string,
    extraParams: Record<string, string> = {}
): string => {
    // Validate inputs
    ensurePositiveInteger(amount, 'Amount');
    ensureNonEmptyString(token, 'Token');
    ensureValidDifficulty(difficulty);

    // Build query parameters
    const params = new URLSearchParams({
        amount: amount.toString(),
        category: CATEGORY_ID.toString(),
        difficulty,
        type: DEFAULT_QUESTION_TYPE,
        token,
    });

    // Append additional query parameters
    Object.entries(extraParams).forEach(([key, value]) => params.set(key, value));

    // Return the fully constructed URL
    return `${API_URL}/api.php?${params.toString()}`;
};
