import { createAnswer } from '../../_lib/createAnswer.ts';
import {
    INITIAL_QUESTION_NUMBER,
    INITIAL_SCORE,
    TOTAL_QUESTIONS,
} from '../../constants/app.constants.ts';
import { ActionType } from '../../types/action-type.type.ts';
import { ActionTypes } from '../../types/action-types.enum.ts';
import { InitialState } from '../../types/initial-state.type.ts';
import { QuestionsState } from '../../types/question-state.type.ts';

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

const setQuestions = (
    state: InitialState,
    action: { type: typeof ActionTypes.SET_QUESTIONS; payload: QuestionsState[] },
): InitialState => ({
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

const checkAnswer = (
    state: InitialState,
    action: {
        type: typeof ActionTypes.CHECK_ANSWER;
        payload: { answer: string; correctAnswer: string; question: string };
    },
): InitialState => {
    const { answer, correctAnswer, question } = action.payload;
    const correct = correctAnswer === answer;
    return {
        ...state,
        score: correct ? state.score + 1 : state.score,
        userAnswers: [...state.userAnswers, createAnswer(question, answer, correct, correctAnswer)],
    };
};

const setError = (
    state: InitialState,
    action: { type: typeof ActionTypes.SET_ERROR; payload: string },
): InitialState => ({
    ...state,
    loading: false,
    gameOver: true,
    error: action.payload,
});

export const quizReducer = (state: InitialState, action: ActionType): InitialState => {
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
