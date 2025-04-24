import { ResponseCode } from '../types/response-code.enum';

/**
 * Base error message for API failures
 * @constant
 */
export const ERROR_MESSAGE_BASE = 'Failed to fetch quiz token' as const;

/**
 * Type for error messages mapping, excluding success case
 * @typedef {Record<Exclude<ResponseCode, ResponseCode.Success>, string>}
 */
type ErrorMessages = Record<Exclude<ResponseCode, ResponseCode.Success>, string>;

/**
 * Mapping of response codes to their corresponding error messages
 * @constant
 */
const responseMessages: ErrorMessages = {
    [ResponseCode.NoResults]: `${ERROR_MESSAGE_BASE}: Could not return results. The API doesn't have enough questions for your query.`,
    [ResponseCode.InvalidParameter]: `${ERROR_MESSAGE_BASE}: Contains an invalid parameter. Arguments passed in aren't valid.`,
    [ResponseCode.NotFound]: `${ERROR_MESSAGE_BASE}: Session Token does not exist.`,
    [ResponseCode.Empty]: `${ERROR_MESSAGE_BASE}: Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.`,
    [ResponseCode.RateLimit]: `${ERROR_MESSAGE_BASE}: Too many requests have occurred. Each IP can only access the API once every 5 seconds.`,
} as const;

/**
 * Returns a specific error message based on the response code
 * @param {Exclude<ResponseCode, ResponseCode.Success>} responseCode - The error response code
 * @returns {string} The corresponding error message
 * @throws {Error} If an invalid response code is provided
 */
export const getApiErrorMessage = (
    responseCode: Exclude<ResponseCode, ResponseCode.Success>,
): string => {
    if (!(responseCode in responseMessages)) {
        throw new Error(`Unhandled response code: ${responseCode}`);
    }
    return responseMessages[responseCode];
};
