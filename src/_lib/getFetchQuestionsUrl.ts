import { API_URL, CATEGORY_ID } from '../constants/api.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';

/**
 * Generates a URL for fetching quiz questions from the API
 * @param {number} amount - The number of questions to fetch (must be positive)
 * @param {Difficulty} difficulty - The difficulty level of questions
 * @param {string} token - Authentication token
 * @returns {string} Properly formatted URL with encoded parameters
 * @throws {Error} If amount is not positive, token is empty, configuration is invalid, or difficulty is invalid
 */
export const getFetchQuestionsUrl = (
    amount: number,
    difficulty: Difficulty,
    token: string,
): string => {
    // Validate configuration and input parameters
    validateConfig();
    validateParams(amount, difficulty, token);

    const params = new URLSearchParams({
        amount: amount.toString(),
        category: CATEGORY_ID.toString(),
        difficulty: difficulty.toString(),
        type: 'multiple',
        token: token.trim()
    });

    const url = new URL('api.php', API_URL);
    url.search = params.toString();
    return url.toString();
};

/**
 * Validates the API configuration
 * @throws {Error} If configuration is invalid
 */
const validateConfig = (): void => {
    if (!API_URL) {
        throw new Error('API_URL is not configured');
    }
};

/**
 * Validates the input parameters
 * @param {number} amount - The number of questions
 * @param {Difficulty} difficulty - The difficulty level
 * @param {string} token - Authentication token
 * @throws {Error} If validation fails
 */
const validateParams = (amount: number, difficulty: Difficulty, token: string): void => {
    if (!Number.isInteger(amount) || amount <= 0) {
        throw new Error('Amount must be a positive integer');
    }

    if (!token?.trim()) {
        throw new Error('Token is required');
    }

    if (!Object.values(Difficulty).includes(difficulty)) {
        throw new Error('Invalid difficulty level');
    }
};
