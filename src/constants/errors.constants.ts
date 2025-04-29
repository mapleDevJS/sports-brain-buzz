// Common error codes and messages
export const API_ERRORS = {
    MISSING_API_URL: { code: 'CFG001', message: 'API_URL is not configured' },
    INVALID_AMOUNT: {
        code: 'VAL001',
        message: 'Amount must be a positive integer within allowed range',
    },
    INVALID_TOKEN: { code: 'VAL002', message: 'Invalid token format or length' },
    INVALID_DIFFICULTY: { code: 'VAL003', message: 'Invalid difficulty level' },
    INVALID_CATEGORY: { code: 'VAL004', message: 'Invalid category ID' },
    URL_CREATION_FAILED: { code: 'URL001', message: 'Failed to create API URL' },
} as const;
