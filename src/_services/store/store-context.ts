import { createContext } from 'react';

import { QuizStorageService } from '../../_application/ports.ts';
import { initialState } from './initial-state.ts';

export const StoreContext = createContext<QuizStorageService>({
    state: initialState,
    startQuiz(): void {
        throw new Error('Method not implemented.');
    },
    setToken(): void {
        throw new Error('Method not implemented.');
    },
    setFetchTokenError(): void {
        throw new Error('Method not implemented.');
    },
    setError(): void {
        throw new Error('Method not implemented.');
    },
    setQuestions(): void {
        throw new Error('Method not implemented.');
    },
    checkAnswer(): void {
        throw new Error('Method not implemented.');
    },
    nextQuestion(): void {
        throw new Error('Method not implemented.');
    },
});
