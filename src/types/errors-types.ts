export interface ApiError {
    readonly code: string;
    readonly message: string;
}

export class BaseApiError extends Error {
    constructor(
        public readonly code: string,
        message: string,
        public readonly name: string = 'ApiError',
    ) {
        super(message);
        this.name = name;
    }
}

export class QuizApiError extends BaseApiError {
    constructor(code: string, message: string) {
        super(code, message, 'QuizApiError');
    }
}

export class TokenUrlError extends BaseApiError {
    constructor(code: string, message: string) {
        super(code, message, 'TokenUrlError');
    }
}
