export const CATEGORY_ID = 21;
export const API_URL = 'https://opentdb.com';
export const API_COMMANDS = {
    REQUEST: 'request',
    RESET: 'reset',
} as const;

export const API_ENDPOINTS = {
    TOKEN: 'api_token.php',
    QUESTIONS: 'api.php',
} as const;
