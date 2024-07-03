import { useReducer, useContext, FC, ReactNode, createContext, useMemo } from 'react';
import { InitialState } from './types/initial-state.type.ts';
import {
    INITIAL_QUESTION_NUMBER,
    INITIAL_SCORE,
    TOTAL_QUESTIONS,
} from '../constants/app.constants.ts';
import { ActionTypes } from './types/action-types.enum.ts';
import { QuestionsState } from './types/question-state.type.ts';
import { createAnswer } from '../_lib/createAnswer.ts';
import { ActionType } from './types/action-type.type.ts';
import { getApiErrorMessage } from '../_lib/get-api-error-messages.ts';
import { QuizStorageService } from '../_application/ports.ts';

const initialState: InitialState = {
    loading: false,
    questions: [],
    currentQuestionNumber: INITIAL_QUESTION_NUMBER,
    userAnswers: [],
    score: INITIAL_SCORE,
    gameOver: true,
    error: null,
};

const StoreContext = createContext<QuizStorageService>({
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

export const useStore = () => useContext<QuizStorageService>(StoreContext);

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

const setToken = (state: InitialState): InitialState => ({
    ...state,
    loading: false,
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
        case ActionTypes.SET_TOKEN:
            return setToken(state);
        default:
            return state;
    }
};

interface ProviderProps {
    children: ReactNode;
}

export const Provider: FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const startQuiz = () => dispatch({ type: ActionTypes.START_QUIZ });
    const setToken = () => dispatch({ type: ActionTypes.SET_TOKEN });
    const setFetchTokenError = () =>
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: `${getApiErrorMessage()} Please try again.`,
        });
    const setError = (message: string) =>
        dispatch({ type: ActionTypes.SET_ERROR, payload: message });
    const setQuestions = (questionsState: QuestionsState[]) =>
        dispatch({ type: ActionTypes.SET_QUESTIONS, payload: questionsState });

    const checkAnswer = (answer: string, correctAnswer: string, question: string) =>
        dispatch({
            type: ActionTypes.CHECK_ANSWER,
            payload: {
                answer,
                correctAnswer,
                question,
            },
        });

    const nextQuestion = () => dispatch({ type: ActionTypes.NEXT_QUESTION });

    const value = useMemo(
        () => ({
            state,
            startQuiz,
            setToken,
            setFetchTokenError,
            setError,
            setQuestions,
            checkAnswer,
            nextQuestion,
        }),
        [state],
    );

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
};
