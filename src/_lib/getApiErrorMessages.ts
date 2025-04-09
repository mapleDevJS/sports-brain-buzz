import { ResponseCode } from '../types/response-code.enum.ts';

/** Base error message used for all API error scenarios. */
export const ERROR_MESSAGE_BASE = 'Failed to fetch quiz token.';

/** Specific error reasons for the given ResponseCodes. */
const ERROR_REASONS: Record<ResponseCode, string> = {
    [ResponseCode.NoResults]: "The API doesn't have enough questions for your query.",
    [ResponseCode.InvalidParameter]: "Contains an invalid parameter. Arguments passed in aren't valid.",
    [ResponseCode.NotFound]: "Session Token does not exist.",
    [ResponseCode.Empty]: "Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.",
    [ResponseCode.RateLimit]: "Too many requests have occurred. Each IP can only access the API once every 5 seconds.",
    [ResponseCode.Success]: '', // Unused, but kept for enum completeness.
};

/**
 * Generates a user-friendly error message by combining the base error message with a specific reason.
 * @param reason The specific reason associated with the ResponseCode.
 * @returns The complete error message.
 */
const getErrorMessage = (reason: string): string => `${ERROR_MESSAGE_BASE} ${reason}`;

/**
 * Map of ResponseCodes (except "Success") to user-friendly error messages.
 * Ensures only error-related ResponseCodes are included.
 */
const RESPONSE_CODE_MESSAGES_MAP: Omit<Record<ResponseCode, string>, ResponseCode.Success> = {
    [ResponseCode.NoResults]: getErrorMessage(ERROR_REASONS[ResponseCode.NoResults]),
    [ResponseCode.InvalidParameter]: getErrorMessage(ERROR_REASONS[ResponseCode.InvalidParameter]),
    [ResponseCode.NotFound]: getErrorMessage(ERROR_REASONS[ResponseCode.NotFound]),
    [ResponseCode.Empty]: getErrorMessage(ERROR_REASONS[ResponseCode.Empty]),
    [ResponseCode.RateLimit]: getErrorMessage(ERROR_REASONS[ResponseCode.RateLimit]),
};

/**
 * Retrieves a user-friendly API error message based on the given ResponseCode.
 * Logs a warning if the ResponseCode is not explicitly handled.
 *
 * @param responseCode A ResponseCode, excluding "Success".
 * @returns The user-friendly error message, or a fallback message if not handled.
 */
export const getApiErrorMessage = (
    responseCode: Exclude<ResponseCode, ResponseCode.Success>,
): string => {
    if (!RESPONSE_CODE_MESSAGES_MAP[responseCode]) {
        console.warn(`Unhandled ResponseCode: ${responseCode}`);
    }
    return RESPONSE_CODE_MESSAGES_MAP[responseCode] || getErrorMessage('Please try again.');
};
