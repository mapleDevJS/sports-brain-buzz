import React, { useCallback, useReducer } from 'react';
import { AnswerObject } from '../types/answer-object.type';
import {
    INITIAL_QUESTION_NUMBER,
    INITIAL_SCORE,
    TOTAL_QUESTIONS,
} from '../constants/app.constants';
import { ActionTypes } from '../store/action-type.type.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { QuestionsState } from '../store/question-state.type.ts';
import quizService from '../api/quiz-service.ts';
import apiService from '../api/api-service.ts';
import { quizReducer } from '../store/quizReducer.ts';
import { InitialState } from '../store/initial-state.type.ts';

const initialState: InitialState = {
    loading: false,
    questions: [] as QuestionsState[],
    currentQuestionNumber: INITIAL_QUESTION_NUMBER,
    userAnswers: [] as AnswerObject[],
    score: INITIAL_SCORE,
    gameOver: true,
    error: null,
};

export const useQuizAppState = () => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const startTrivia = useCallback(async () => {
        dispatch({ type: ActionTypes.START_QUIZ });
        try {
            const newQuestions = await quizService.fetchQuizQuestions(
                TOTAL_QUESTIONS,
                Difficulty.MEDIUM,
                apiService,
            );
            dispatch({ type: ActionTypes.SET_QUESTIONS, payload: newQuestions });
        } catch (error) {
            dispatch({
                type: ActionTypes.SET_ERROR,
                payload: 'Failed to fetch quiz questions. Please try again.',
            });
        }
    }, []);

    const checkAnswer = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (state.gameOver) return;
            const answer = e.currentTarget.value;
            const currentQuestion = state.questions[state.currentQuestionNumber];
            dispatch({
                type: ActionTypes.CHECK_ANSWER,
                payload: {
                    answer,
                    correctAnswer: currentQuestion.correct_answer,
                    question: currentQuestion.question,
                },
            });
        },
        [state],
    );

    const nextQuestion = useCallback(() => {
        dispatch({ type: ActionTypes.NEXT_QUESTION });
    }, []);

    return { state, startTrivia, checkAnswer, nextQuestion };
};
