import { describe, expect, it } from 'vitest';

import { ActionTypes } from '../../../../types/action-types.enum';
import { QuizState } from '../../../../types/quiz-state.type';
import { quizReducer } from '../quiz-reducer';

describe('quizReducer', () => {
    const initialState: QuizState = {
        questions: [],
        currentQuestionNumber: 0,
        score: 0,
        gameOver: false,
        error: null,
        fetchTokenError: null,
        userAnswers: [],
        loading: false,
    };

    it('handles START_QUIZ action', () => {
        const nextState = quizReducer(initialState, { type: ActionTypes.START_QUIZ });
        expect(nextState.loading).toBe(true);
        expect(nextState.gameOver).toBe(false);
        expect(nextState.questions).toEqual([]);
    });

    it('handles SET_ERROR action', () => {
        const nextState = quizReducer(initialState, {
            type: ActionTypes.SET_ERROR,
            payload: 'Test error',
        });
        expect(nextState.error).toBe('Test error');
        expect(nextState.loading).toBe(false);
        expect(nextState.gameOver).toBe(true);
    });

    it('handles CHECK_ANSWER action with correct answer', () => {
        const stateWithQuestions: QuizState = {
            ...initialState,
            questions: [
                {
                    question: 'Test?',
                    correct_answer: 'Correct',
                    answers: ['Correct', 'Wrong'],
                    userAnswer: undefined,
                },
            ],
        };

        const nextState = quizReducer(stateWithQuestions, {
            type: ActionTypes.CHECK_ANSWER,
            payload: {
                userAnswer: 'Correct',
                expectedAnswer: 'Correct',
                userQuestion: 'Test?',
            },
        });

        expect(nextState.score).toBe(1);
        expect(nextState.userAnswers).toHaveLength(1);
        expect(nextState.userAnswers[0].isCorrect).toBe(true);
    });

    it('handles CHECK_ANSWER action with incorrect answer', () => {
        const stateWithQuestions: QuizState = {
            ...initialState,
            questions: [
                {
                    question: 'Test?',
                    correct_answer: 'Correct',
                    answers: ['Correct', 'Wrong'],
                    userAnswer: undefined,
                },
            ],
        };

        const nextState = quizReducer(stateWithQuestions, {
            type: ActionTypes.CHECK_ANSWER,
            payload: {
                userAnswer: 'Wrong',
                expectedAnswer: 'Correct',
                userQuestion: 'Test?',
            },
        });

        expect(nextState.score).toBe(0);
        expect(nextState.userAnswers).toHaveLength(1);
        expect(nextState.userAnswers[0].isCorrect).toBe(false);
    });

    it('handles NEXT_QUESTION action', () => {
        const stateWithQuestions: QuizState = {
            ...initialState,
            questions: [
                { question: '1', correct_answer: 'A', answers: ['A'], userAnswer: undefined },
                { question: '2', correct_answer: 'B', answers: ['B'], userAnswer: undefined },
            ],
            currentQuestionNumber: 0,
        };

        const nextState = quizReducer(stateWithQuestions, { type: ActionTypes.NEXT_QUESTION });
        expect(nextState.currentQuestionNumber).toBe(1);
        expect(nextState.gameOver).toBe(false);
    });

    it('sets gameOver when moving past last question', () => {
        const stateWithQuestions: QuizState = {
            ...initialState,
            questions: Array(10)
                .fill(null)
                .map(() => ({
                    question: 'Q',
                    correct_answer: 'A',
                    answers: ['A'],
                    userAnswer: undefined,
                })),
            currentQuestionNumber: 9,
        };

        const nextState = quizReducer(stateWithQuestions, { type: ActionTypes.NEXT_QUESTION });
        expect(nextState.gameOver).toBe(true);
        expect(nextState.currentQuestionNumber).toBe(10);
    });
});
