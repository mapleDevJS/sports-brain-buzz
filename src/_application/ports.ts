import { Difficulty } from '../types/difficulty.enum.ts';
import { Question } from '../_domain/question.type.ts';
import { ResponseCode } from '../types/response-code.enum.ts';
import { HttpResponse } from '../types/http-response.interface.ts';
import { TokenKey } from '../types/token-key.type.ts';

export interface ResponseRdo {
    response_code: ResponseCode;
}

export type QuestionRdo = ResponseRdo & { results: Question[] };
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

export interface ApiService {
    get<T>(url: string): Promise<HttpResponse<T>>;
    post<T, U>(url: string, data: U): Promise<HttpResponse<T>>;
    put<T, U>(url: string, data: U): Promise<HttpResponse<T>>;
    delete<T>(url: string): Promise<HttpResponse<T>>;
}

export interface HttpService {
    get<T>(url: string): Promise<HttpResponse<T>>;
    post<T, U>(url: string, data: U): Promise<HttpResponse<T>>;
    put<T, U>(url: string, data: U): Promise<HttpResponse<T>>;
    delete<T>(url: string): Promise<HttpResponse<T>>;
}

export interface StorageService {
    getItem(key: TokenKey): string | null;
    setItem(key: TokenKey, value: string): void;
    removeItem(key: TokenKey): void;
    clear(): void;
    key(index: number): string | null;
    length: number;
}
