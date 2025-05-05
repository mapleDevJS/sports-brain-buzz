import { QuestionEntity } from '../../_domain/entities/question.entity.ts';
import { Difficulty } from '../../types/difficulty.enum.ts';
import { QuizQuestion } from '../../types/question-state.type.ts';
import { QuizState } from '../../types/quiz-state.type.ts';
import { ResponseCode } from '../../types/response-code.enum.ts';

export interface ResponseRdo {
    response_code: ResponseCode;
}

export type QuestionRdo = ResponseRdo & { results: QuestionEntity[] };
export type TokenRdo = ResponseRdo & { response_message: string; token: string };
export type ResetTokenRdo = ResponseRdo & { token: string };

export interface QuizApiService {
    fetchQuestions(
        amount: number,
        difficulty: Difficulty,
        token: string,
    ): Promise<HttpResponse<QuestionRdo>>;
    fetchToken(): Promise<HttpResponse<TokenRdo>>;
    resetToken(token: string): Promise<HttpResponse<ResetTokenRdo>>;
}

export interface HttpClient {
    fetch(url: string, init?: RequestInit): Promise<Response>;
}

export interface Logger {
    debug(obj: object, msg?: string, ...args: never[]): void;
    debug(msg: string, ...args: never[]): void;

    info(obj: object, msg?: string, ...args: never[]): void;
    info(msg: string, ...args: never[]): void;

    warn(obj: object, msg?: string, ...args: never[]): void;
    warn(msg: string, ...args: never[]): void;

    error(obj: object, msg?: string, ...args: never[]): void;
    error(msg: string, ...args: never[]): void;

    fatal(obj: object, msg?: string, ...args: never[]): void;
    fatal(msg: string, ...args: never[]): void;
}

export interface HttpService {
    get<T>(url: string): Promise<HttpResponse<T>>;
    post<T, U>(url: string, data: U): Promise<HttpResponse<T>>;
    put<T, U>(url: string, data: U): Promise<HttpResponse<T>>;
    delete<T>(url: string): Promise<HttpResponse<T>>;
}

export interface QuizStorageService {
    state: QuizState;
    startQuiz: () => void;
    setFetchTokenError: (message: string) => void;
    setError: (message: string) => void;
    setQuestions: (questionState: QuizQuestion[]) => void;
    checkAnswer: (answer: string, correctAnswer: string, question: string) => void;
    nextQuestion: () => void;
}

export interface LocalStorageService {
    getItem(key: TokenKey): string | null;
    setItem(key: TokenKey, value: string): void;
    removeItem(key: TokenKey): void;
    clear(): void;
    key(index: number): string | null;
    length: number;
}

export interface LoggerService {
    debug(message: string, ...args: unknown[]): void;
    info(message: string, ...args: unknown[]): void;
    warn(message: string, ...args: unknown[]): void;
    error(message: string, error?: unknown, ...args: unknown[]): void;
}
