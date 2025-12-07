export class ApiError extends Error {
    constructor(
        public readonly statusCode: number,
        message: string,
        public readonly context?: Record<string, unknown>,
    ) {
        super(message);
        this.name = 'ApiError';
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static badRequest(message: string, context?: Record<string, unknown>): ApiError {
        return new ApiError(400, message, context);
    }

    static notFound(message: string, context?: Record<string, unknown>): ApiError {
        return new ApiError(404, message, context);
    }

    static internalServer(message: string, context?: Record<string, unknown>): ApiError {
        return new ApiError(500, message, context);
    }

    static rateLimit(message: string, context?: Record<string, unknown>): ApiError {
        return new ApiError(429, message, context);
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            context: this.context,
        };
    }
}
