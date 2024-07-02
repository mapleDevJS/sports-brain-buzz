import { ResponseCode } from '../types/response-code.enum.ts';

const ERROR_MESSAGE_BASE = 'Failed to fetch quiz token.';

export const constructErrorMessage = (responseCode?: ResponseCode): string => {
    switch (responseCode) {
        case ResponseCode.NoResults:
            return `${ERROR_MESSAGE_BASE} Could not return results. The API doesn't have enough questions for your query.`;
        case ResponseCode.InvalidParameter:
            return `${ERROR_MESSAGE_BASE} Contains an invalid parameter. Arguements passed in aren't valid.`;
        case ResponseCode.NotFound:
            return `${ERROR_MESSAGE_BASE} Session Token does not exist.`;
        case ResponseCode.Empty:
            return `${ERROR_MESSAGE_BASE} Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.`;
        case ResponseCode.RateLimit:
            return `${ERROR_MESSAGE_BASE} Too many requests have occurred. Each IP can only access the API once every 5 seconds.`;
        default:
            return `${ERROR_MESSAGE_BASE} Please try again.`;
    }
};
