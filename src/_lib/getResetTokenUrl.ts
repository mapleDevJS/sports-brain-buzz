import { API_URL } from '../constants/api.constants'; // Removed `.ts` extension

/** Default command used in reset token actions. */
const DEFAULT_COMMAND = 'reset';

/** Path to the reset token API endpoint. */
const API_PATH = '/api_token.php';

/** Regex pattern for validating reset tokens: allows alphanumeric, dashes, and underscores. */
const RESET_TOKEN_PATTERN = /^[a-zA-Z0-9-_]+$/;

/** Error message for an empty or invalid reset token. */
const EMPTY_TOKEN_ERROR = 'Invalid reset token: Token must be a non-empty string.';
const INVALID_TOKEN_ERROR =
    'Invalid reset token: Token contains invalid characters. Only alphanumeric, dashes, and underscores are allowed.';

/**
 * Validates that a reset token is a non-empty string and adheres to the required format.
 *
 * @param token - The reset token to validate.
 * @throws {Error} If the token is empty or does not match the expected pattern.
 */
const validateResetToken = (token: string): void => {
    if (!token || token.trim() === '') {
        throw new Error(EMPTY_TOKEN_ERROR);
    }
    if (!RESET_TOKEN_PATTERN.test(token)) {
        throw new Error(INVALID_TOKEN_ERROR);
    }
};

/**
 * Generates a reset token URL with optional command parameters.
 *
 * @param params - Parameters for constructing the URL.
 * @param params.resetToken - The reset token to be validated and included in the URL.
 * @param params.command - Optional command parameter (default: "reset").
 * @returns The fully constructed reset token URL as a string.
 * @throws {Error} If the resetToken is invalid.
 */
export const getResetTokenUrl = ({
    resetToken,
    command = DEFAULT_COMMAND,
}: {
    resetToken: string;
    command?: string;
}): string => {
    validateResetToken(resetToken);
    const url = new URL(`${API_URL}${API_PATH}`);
    url.searchParams.append('command', command);
    url.searchParams.append('token', resetToken);
    return url.toString();
};
