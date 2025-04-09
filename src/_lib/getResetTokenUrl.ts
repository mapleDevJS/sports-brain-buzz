import { API_URL } from '../constants/api.constants.ts';

/** API Command Parameter */
const RESET_COMMAND = 'reset';

/**
 * Validates that the reset token is a valid, non-empty string.
 *
 * @param token - Token to be validated.
 * @throws {Error} If the token is invalid (empty or not a string).
 */
const validateResetToken = (token: string): void => {
    if (!token || token.trim() === '') {
        throw new Error('Invalid reset token: Token must be a non-empty string.');
    }
};

/**
 * Generates the reset token URL for the given token.
 *
 * @param resetToken - The token used to construct the reset URL.
 * @returns The complete URL as a string.
 * @throws {Error} If the resetToken is invalid.
 */
export const getResetTokenUrl = (resetToken: string): string => {
    validateResetToken(resetToken);

    const url = new URL(`${API_URL}/api_token.php`);
    url.searchParams.append('command', RESET_COMMAND);
    url.searchParams.append('token', resetToken);

    return url.toString();
};
