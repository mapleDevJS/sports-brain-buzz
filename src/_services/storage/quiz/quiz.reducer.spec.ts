import { beforeEach, describe, expect, it } from 'vitest';

import {
    INITIAL_QUESTION_NUMBER,
    INITIAL_SCORE,
    TOTAL_QUESTIONS,
} from '../../../constants/app.constants';
import { ActionTypes } from '../../../types/action-types.enum';
import { QuizQuestion } from '../../../types/question-state.type';
import { QuizState } from '../../../types/quiz-state.type';
import { initialState } from './initial-state';
import { quizReducer } from './quiz.reducer';

describe('quizReducer', () => {
    let testState: QuizState;

    beforeEach(() => {
        testState = { ...initialState };
    });

    describe('START_QUIZ Action', () => {
        it('should initialize quiz state when START_QUIZ is dispatched', () => {
            const action = { type: ActionTypes.START_QUIZ };
            const newState = quizReducer(testState, action);

            expect(newState.loading).toBe(true);
            expect(newState.gameOver).toBe(false);
            expect(newState.error).toBe(null);
            expect(newState.questions).toEqual([]);
            expect(newState.currentQuestionNumber).toBe(INITIAL_QUESTION_NUMBER);
            expect(newState.userAnswers).toEqual([]);
            expect(newState.score).toBe(INITIAL_SCORE);
        });

        it('should reset quiz state even if quiz is in progress', () => {
            const stateInProgress: QuizState = {
                loading: false,
                questions: [
                    {
                        question: 'Test?',
                        answers: ['A', 'B', 'C', 'D'],
                        correct_answer: 'A',
                    } as QuizQuestion,
                ],
                currentQuestionNumber: 5,
                userAnswers: [
                    {
                        userQuestion: 'Test?',
                        userAnswer: 'A',
                        isCorrect: true,
                        expectedAnswer: 'A',
                    },
                ],
                score: 3,
                gameOver: false,
                error: null,
            };

            const action = { type: ActionTypes.START_QUIZ };
            const newState = quizReducer(stateInProgress, action);

            expect(newState.loading).toBe(true);
            expect(newState.questions).toEqual([]);
            expect(newState.currentQuestionNumber).toBe(INITIAL_QUESTION_NUMBER);
            expect(newState.userAnswers).toEqual([]);
            expect(newState.score).toBe(INITIAL_SCORE);
        });

        it('should clear any existing error when starting quiz', () => {
            const stateWithError: QuizState = {
                ...testState,
                error: 'Previous error message',
            };

            const action = { type: ActionTypes.START_QUIZ };
            const newState = quizReducer(stateWithError, action);

            expect(newState.error).toBe(null);
        });

        it('should set loading to true to indicate quiz is loading', () => {
            const action = { type: ActionTypes.START_QUIZ };
            const newState = quizReducer(testState, action);

            expect(newState.loading).toBe(true);
        });

        it('should set gameOver to false when starting new quiz', () => {
            const stateGameOver: QuizState = {
                ...testState,
                gameOver: true,
            };

            const action = { type: ActionTypes.START_QUIZ };
            const newState = quizReducer(stateGameOver, action);

            expect(newState.gameOver).toBe(false);
        });

        it('should preserve other state properties not explicitly reset', () => {
            const action = { type: ActionTypes.START_QUIZ };
            const newState = quizReducer(testState, action);

            // Ensure the state has all required properties
            expect(newState).toHaveProperty('loading');
            expect(newState).toHaveProperty('questions');
            expect(newState).toHaveProperty('currentQuestionNumber');
            expect(newState).toHaveProperty('userAnswers');
            expect(newState).toHaveProperty('score');
            expect(newState).toHaveProperty('gameOver');
            expect(newState).toHaveProperty('error');
        });

        it('should reset score to initial value', () => {
            const stateWithScore: QuizState = {
                ...testState,
                score: 7,
            };

            const action = { type: ActionTypes.START_QUIZ };
            const newState = quizReducer(stateWithScore, action);

            expect(newState.score).toBe(INITIAL_SCORE);
        });
    });

    describe('SET_QUESTIONS Action', () => {
        const mockQuestions: QuizQuestion[] = [
            {
                question: 'Question 1?',
                answers: ['A', 'B', 'C', 'D'],
                correct_answer: 'A',
            } as QuizQuestion,
            {
                question: 'Question 2?',
                answers: ['E', 'F', 'G', 'H'],
                correct_answer: 'F',
            } as QuizQuestion,
        ];

        it('should set questions when SET_QUESTIONS is dispatched', () => {
            const action = {
                type: ActionTypes.SET_QUESTIONS,
                payload: mockQuestions,
            };
            const newState = quizReducer(testState, action);

            expect(newState.questions).toEqual(mockQuestions);
            expect(newState.questions).toHaveLength(2);
        });

        it('should set loading to false when questions are loaded', () => {
            const loadingState: QuizState = {
                ...testState,
                loading: true,
            };

            const action = {
                type: ActionTypes.SET_QUESTIONS,
                payload: mockQuestions,
            };
            const newState = quizReducer(loadingState, action);

            expect(newState.loading).toBe(false);
        });

        it('should handle empty questions array', () => {
            const action = {
                type: ActionTypes.SET_QUESTIONS,
                payload: [],
            };
            const newState = quizReducer(testState, action);

            expect(newState.questions).toEqual([]);
            expect(newState.loading).toBe(false);
        });

        it('should replace existing questions with new ones', () => {
            const stateWithQuestions: QuizState = {
                ...testState,
                questions: mockQuestions,
            };

            const newQuestions: QuizQuestion[] = [
                {
                    question: 'New Question?',
                    answers: ['1', '2', '3', '4'],
                    correct_answer: '1',
                } as QuizQuestion,
            ];

            const action = {
                type: ActionTypes.SET_QUESTIONS,
                payload: newQuestions,
            };
            const newState = quizReducer(stateWithQuestions, action);

            expect(newState.questions).toEqual(newQuestions);
            expect(newState.questions).toHaveLength(1);
        });

        it('should handle exactly TOTAL_QUESTIONS questions', () => {
            const fullQuestions: QuizQuestion[] = Array.from(
                { length: TOTAL_QUESTIONS },
                (_, i) => ({
                    question: `Question ${i + 1}?`,
                    answers: ['A', 'B', 'C', 'D'],
                    correct_answer: 'A',
                }),
            ) as QuizQuestion[];

            const action = {
                type: ActionTypes.SET_QUESTIONS,
                payload: fullQuestions,
            };
            const newState = quizReducer(testState, action);

            expect(newState.questions).toHaveLength(TOTAL_QUESTIONS);
        });
    });

    describe('NEXT_QUESTION Action', () => {
        it('should increment currentQuestionNumber when NEXT_QUESTION is dispatched', () => {
            const action = { type: ActionTypes.NEXT_QUESTION };
            const newState = quizReducer(testState, action);

            expect(newState.currentQuestionNumber).toBe(INITIAL_QUESTION_NUMBER + 1);
        });

        it('should increment from current question number', () => {
            const stateAtQuestion5: QuizState = {
                ...testState,
                currentQuestionNumber: 5,
            };

            const action = { type: ActionTypes.NEXT_QUESTION };
            const newState = quizReducer(stateAtQuestion5, action);

            expect(newState.currentQuestionNumber).toBe(6);
        });

        it('should set gameOver to true when reaching TOTAL_QUESTIONS', () => {
            const stateAtLastQuestion: QuizState = {
                ...testState,
                currentQuestionNumber: TOTAL_QUESTIONS - 1,
                gameOver: false,
            };

            const action = { type: ActionTypes.NEXT_QUESTION };
            const newState = quizReducer(stateAtLastQuestion, action);

            expect(newState.currentQuestionNumber).toBe(TOTAL_QUESTIONS);
            expect(newState.gameOver).toBe(true);
        });

        it('should not set gameOver to true before reaching TOTAL_QUESTIONS', () => {
            const stateBeforeLastQuestion: QuizState = {
                ...testState,
                currentQuestionNumber: TOTAL_QUESTIONS - 2,
                gameOver: false,
            };

            const action = { type: ActionTypes.NEXT_QUESTION };
            const newState = quizReducer(stateBeforeLastQuestion, action);

            expect(newState.currentQuestionNumber).toBe(TOTAL_QUESTIONS - 1);
            expect(newState.gameOver).toBe(false);
        });
    });

    describe('CHECK_ANSWER Action', () => {
        const answerPayload = {
            userAnswer: 'France',
            expectedAnswer: 'France',
            userQuestion: 'Which team won the 2018 FIFA World Cup?',
        };

        it('should add user answer to userAnswers array', () => {
            const action = {
                type: ActionTypes.CHECK_ANSWER,
                payload: answerPayload,
            };
            const newState = quizReducer(testState, action);

            expect(newState.userAnswers).toHaveLength(1);
            expect(newState.userAnswers[0]).toEqual({
                userQuestion: answerPayload.userQuestion,
                userAnswer: answerPayload.userAnswer,
                isCorrect: true,
                expectedAnswer: answerPayload.expectedAnswer,
            });
        });

        it('should increment score when answer is correct', () => {
            const action = {
                type: ActionTypes.CHECK_ANSWER,
                payload: answerPayload,
            };
            const newState = quizReducer(testState, action);

            expect(newState.score).toBe(INITIAL_SCORE + 1);
        });

        it('should not increment score when answer is incorrect', () => {
            const incorrectPayload = {
                ...answerPayload,
                userAnswer: 'Germany',
            };

            const action = {
                type: ActionTypes.CHECK_ANSWER,
                payload: incorrectPayload,
            };
            const newState = quizReducer(testState, action);

            expect(newState.score).toBe(INITIAL_SCORE);
            expect(newState.userAnswers[0]?.isCorrect).toBe(false);
        });

        it('should mark answer as correct when answers match', () => {
            const action = {
                type: ActionTypes.CHECK_ANSWER,
                payload: answerPayload,
            };
            const newState = quizReducer(testState, action);

            expect(newState.userAnswers[0]?.isCorrect).toBe(true);
        });

        it('should mark answer as incorrect when answers do not match', () => {
            const incorrectPayload = {
                ...answerPayload,
                userAnswer: 'Brazil',
            };

            const action = {
                type: ActionTypes.CHECK_ANSWER,
                payload: incorrectPayload,
            };
            const newState = quizReducer(testState, action);

            expect(newState.userAnswers[0]?.isCorrect).toBe(false);
        });

        it('should append new answer to existing userAnswers', () => {
            const stateWithAnswers: QuizState = {
                ...testState,
                userAnswers: [
                    {
                        userQuestion: 'Previous question?',
                        userAnswer: 'Previous answer',
                        isCorrect: true,
                        expectedAnswer: 'Previous answer',
                    },
                ],
                score: 1,
            };

            const action = {
                type: ActionTypes.CHECK_ANSWER,
                payload: answerPayload,
            };
            const newState = quizReducer(stateWithAnswers, action);

            expect(newState.userAnswers).toHaveLength(2);
            expect(newState.userAnswers[1]?.userAnswer).toBe(answerPayload.userAnswer);
        });

        it('should handle case-sensitive answer comparison', () => {
            const caseSensitivePayload = {
                userAnswer: 'france', // lowercase
                expectedAnswer: 'France', // capitalized
                userQuestion: 'Test question?',
            };

            const action = {
                type: ActionTypes.CHECK_ANSWER,
                payload: caseSensitivePayload,
            };
            const newState = quizReducer(testState, action);

            expect(newState.userAnswers[0]?.isCorrect).toBe(false);
            expect(newState.score).toBe(INITIAL_SCORE);
        });
    });

    describe('SET_ERROR Action', () => {
        const errorMessage = 'Failed to fetch questions';

        it('should set error message when SET_ERROR is dispatched', () => {
            const action = {
                type: ActionTypes.SET_ERROR,
                payload: errorMessage,
            };
            const newState = quizReducer(testState, action);

            expect(newState.error).toBe(errorMessage);
        });

        it('should set loading to false when error occurs', () => {
            const loadingState: QuizState = {
                ...testState,
                loading: true,
            };

            const action = {
                type: ActionTypes.SET_ERROR,
                payload: errorMessage,
            };
            const newState = quizReducer(loadingState, action);

            expect(newState.loading).toBe(false);
        });

        it('should set gameOver to true when error occurs', () => {
            const action = {
                type: ActionTypes.SET_ERROR,
                payload: errorMessage,
            };
            const newState = quizReducer(testState, action);

            expect(newState.gameOver).toBe(true);
        });

        it('should replace existing error with new error', () => {
            const stateWithError: QuizState = {
                ...testState,
                error: 'Old error',
            };

            const action = {
                type: ActionTypes.SET_ERROR,
                payload: errorMessage,
            };
            const newState = quizReducer(stateWithError, action);

            expect(newState.error).toBe(errorMessage);
        });
    });

    describe('Immutability', () => {
        it('should not mutate original state on START_QUIZ', () => {
            const originalState = { ...testState };
            const action = { type: ActionTypes.START_QUIZ };

            quizReducer(testState, action);

            expect(testState).toEqual(originalState);
        });

        it('should not mutate original state on SET_QUESTIONS', () => {
            const originalState = { ...testState };
            const action = {
                type: ActionTypes.SET_QUESTIONS,
                payload: [
                    {
                        question: 'Test?',
                        answers: ['A', 'B'],
                        correct_answer: 'A',
                    } as QuizQuestion,
                ],
            };

            quizReducer(testState, action);

            expect(testState).toEqual(originalState);
        });

        it('should not mutate original state on CHECK_ANSWER', () => {
            const originalState = { ...testState };
            const action = {
                type: ActionTypes.CHECK_ANSWER,
                payload: {
                    userAnswer: 'A',
                    expectedAnswer: 'A',
                    userQuestion: 'Test?',
                },
            };

            quizReducer(testState, action);

            expect(testState).toEqual(originalState);
        });

        it('should create new userAnswers array reference', () => {
            const action = {
                type: ActionTypes.CHECK_ANSWER,
                payload: {
                    userAnswer: 'A',
                    expectedAnswer: 'A',
                    userQuestion: 'Test?',
                },
            };

            const newState = quizReducer(testState, action);

            expect(newState.userAnswers).not.toBe(testState.userAnswers);
        });
    });

    describe('Default Case', () => {
        it('should return unchanged state for unknown action type', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
            const newState = quizReducer(testState, unknownAction);

            expect(newState).toEqual(testState);
        });
    });

    describe('Integration Scenarios', () => {
        it('should handle complete quiz flow', () => {
            // Start quiz
            let state = quizReducer(testState, { type: ActionTypes.START_QUIZ });
            expect(state.loading).toBe(true);
            expect(state.gameOver).toBe(false);

            // Set questions
            const questions: QuizQuestion[] = Array.from({ length: 2 }, (_, i) => ({
                question: `Question ${i + 1}?`,
                answers: ['A', 'B', 'C', 'D'],
                correct_answer: 'A',
            })) as QuizQuestion[];

            state = quizReducer(state, {
                type: ActionTypes.SET_QUESTIONS,
                payload: questions,
            });
            expect(state.loading).toBe(false);
            expect(state.questions).toHaveLength(2);

            // Answer first question correctly
            state = quizReducer(state, {
                type: ActionTypes.CHECK_ANSWER,
                payload: {
                    userAnswer: 'A',
                    expectedAnswer: 'A',
                    userQuestion: 'Question 1?',
                },
            });
            expect(state.score).toBe(1);
            expect(state.userAnswers).toHaveLength(1);

            // Move to next question
            state = quizReducer(state, { type: ActionTypes.NEXT_QUESTION });
            expect(state.currentQuestionNumber).toBe(1);
        });

        it('should handle error during quiz', () => {
            // Start quiz
            let state = quizReducer(testState, { type: ActionTypes.START_QUIZ });
            expect(state.loading).toBe(true);

            // Error occurs
            state = quizReducer(state, {
                type: ActionTypes.SET_ERROR,
                payload: 'Network error',
            });
            expect(state.loading).toBe(false);
            expect(state.gameOver).toBe(true);
            expect(state.error).toBe('Network error');
        });
    });
});
