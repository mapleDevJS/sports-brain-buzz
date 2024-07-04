// Import ResponseCode enum.
import { ResponseCode } from '../types/response-code.enum.ts';

const ERROR_MESSAGE_BASE = 'Failed to fetch quiz token.';

// Update responseMessages to handle all ResponseCode cases.
const responseMessages: Omit<Record<ResponseCode, string>, ResponseCode.Success> = {
    [ResponseCode.NoResults]: `${ERROR_MESSAGE_BASE} Could not return results. The API doesn't have enough questions for your query.`,
    [ResponseCode.InvalidParameter]: `${ERROR_MESSAGE_BASE} Contains an invalid parameter. Arguments passed in aren't valid.`,
    [ResponseCode.NotFound]: `${ERROR_MESSAGE_BASE} Session Token does not exist.`,
    [ResponseCode.Empty]: `${ERROR_MESSAGE_BASE} Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.`,
    [ResponseCode.RateLimit]: `${ERROR_MESSAGE_BASE} Too many requests have occurred. Each IP can only access the API once every 5 seconds.`,
};

export const getApiErrorMessage = (
    responseCode: Exclude<ResponseCode, ResponseCode.Success>,
): string => {
    // Return specific error message if it exists, otherwise return a general fallback message.
    return responseMessages[responseCode] || `${ERROR_MESSAGE_BASE} Please try again.`;
};
