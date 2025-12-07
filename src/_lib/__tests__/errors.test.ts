import { describe, expect, it } from 'vitest';

import { ApiError } from '../errors';

describe('ApiError', () => {
    it('creates an error with status code and message', () => {
        const error = new ApiError(404, 'Not found');
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe('Not found');
        expect(error.name).toBe('ApiError');
    });

    it('creates a bad request error', () => {
        const error = ApiError.badRequest('Invalid input');
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Invalid input');
    });

    it('creates a not found error', () => {
        const error = ApiError.notFound('Resource not found');
        expect(error.statusCode).toBe(404);
    });

    it('creates an internal server error', () => {
        const error = ApiError.internalServer('Server error');
        expect(error.statusCode).toBe(500);
    });

    it('creates a rate limit error', () => {
        const error = ApiError.rateLimit('Too many requests');
        expect(error.statusCode).toBe(429);
    });

    it('includes context in toJSON', () => {
        const error = new ApiError(500, 'Error', { foo: 'bar' });
        const json = error.toJSON();
        expect(json).toEqual({
            name: 'ApiError',
            message: 'Error',
            statusCode: 500,
            context: { foo: 'bar' },
        });
    });
});
