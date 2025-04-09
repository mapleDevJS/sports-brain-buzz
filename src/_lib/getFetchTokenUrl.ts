import { API_URL } from '../constants/api.constants.ts';

const TOKEN_ENDPOINT = '/api_token.php';
const TOKEN_QUERY_PARAMS = { command: 'request' };

/**
 * Constructs the URL for fetching the token from the API.
 *
 * @returns {string} The constructed URL to fetch the API token.
 */
export const getFetchTokenUrl = (): string => {
    const queryParams = new URLSearchParams(TOKEN_QUERY_PARAMS);
    return `${API_URL}${TOKEN_ENDPOINT}?${queryParams.toString()}`;
};
