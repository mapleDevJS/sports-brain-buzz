import React, { useCallback, useReducer } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionsState } from '../api';
import { createAnswerObject } from '../helpers/createAnswerObject';
import { AnswerObject } from '../types/answer-object.type';
import {
    INITIAL_QUESTION_NUMBER,
    INITIAL_SCORE,
    TOTAL_QUESTIONS
} from '../constants/app.constants';
import { ActionType, ActionTypes } from '../types/action-type.type.ts';

type InitialState = {
    loading: boolean;
    questions: QuestionsState[];
    currentQuestionNumber: number;
    userAnswers: AnswerObject[];
    score: number;
    gameOver: boolean;
    error: string | null;
};

const initialState: InitialState = {
    loading: false,
    questions: [] as QuestionsState[],
    currentQuestionNumber: INITIAL_QUESTION_NUMBER,
    userAnswers: [] as AnswerObject[],
    score: INITIAL_SCORE,
    gameOver: true,
    error: null,
};

const startQuiz = (state: InitialState): InitialState => ({
    ...state,
    loading: true,
    gameOver: false,
    error: null,
    questions: [],
    currentQuestionNumber: INITIAL_QUESTION_NUMBER,
    userAnswers: [],
    score: INITIAL_SCORE,
});

const setQuestions = (state: InitialState, action: { type: typeof ActionTypes.SET_QUESTIONS; payload: QuestionsState[] }): InitialState => ({
    ...state,
    loading: false,
    questions: action.payload,
});

const nextQuestion = (state: InitialState): InitialState => {
    const newQuestionNumber = state.currentQuestionNumber + 1;
    return {
        ...state,
        currentQuestionNumber: newQuestionNumber,
        gameOver: newQuestionNumber === TOTAL_QUESTIONS,
    };
};

const checkAnswer = (state: InitialState, action: { type: typeof ActionTypes.CHECK_ANSWER; payload: { answer: string, correctAnswer: string, question: string } }): InitialState => {
    const { answer, correctAnswer, question } = action.payload;
    const correct = correctAnswer === answer;
    return {
        ...state,
        score: correct ? state.score + 1 : state.score,
        userAnswers: [
            ...state.userAnswers,
            createAnswerObject(question, answer, correct, correctAnswer)
        ],
    };
};

const setError = (state: InitialState, action: { type: typeof ActionTypes.SET_ERROR; payload: string }): InitialState => ({
    ...state,
    loading: false,
    gameOver: true,
    error: action.payload,
});

const quizReducer = (state: InitialState, action: ActionType): InitialState => {
    switch (action.type) {
        case ActionTypes.START_QUIZ:
            return startQuiz(state);
        case ActionTypes.SET_QUESTIONS:
            return setQuestions(state, action);
        case ActionTypes.NEXT_QUESTION:
            return nextQuestion(state);
        case ActionTypes.CHECK_ANSWER:
            return checkAnswer(state, action);
        case ActionTypes.SET_ERROR:
            return setError(state, action);
        default:
            return state;
    }
};

export const useQuizAppState = () => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const startTrivia = useCallback(async () => {
        dispatch({ type: ActionTypes.START_QUIZ });
        try {
            const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM);
            dispatch({ type: ActionTypes.SET_QUESTIONS, payload: newQuestions });
        } catch (error) {
            dispatch({ type: ActionTypes.SET_ERROR, payload: 'Failed to fetch quiz questions. Please try again.' });
        }
    }, []);

    const checkAnswer = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (state.gameOver) return;
        const answer = e.currentTarget.value;
        const currentQuestion = state.questions[state.currentQuestionNumber];
        dispatch({
            type: ActionTypes.CHECK_ANSWER,
            payload: {
                answer,
                correctAnswer: currentQuestion.correct_answer,
                question: currentQuestion.question
            }
        });
    }, [state]);

    const nextQuestion = useCallback(() => {
        dispatch({ type: ActionTypes.NEXT_QUESTION });
    }, []);

    return { state, startTrivia, checkAnswer, nextQuestion };
};
