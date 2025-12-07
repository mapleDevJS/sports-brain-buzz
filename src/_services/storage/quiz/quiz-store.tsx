'use client';

import { FC, ReactNode, useMemo, useReducer } from 'react';

import { ActionTypes } from '../../../types/action-types.enum';
import { QuizQuestion } from '../../../types/question-state.type';
import { initialState } from './initial-state';
import { quizReducer } from './quiz-reducer';
import { QuizStoreContext } from './quizStore-context';

interface ProviderProps {
    children: ReactNode;
}

export const StorageProvider: FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const startQuiz = () => dispatch({ type: ActionTypes.START_QUIZ });
    const setFetchTokenError = (payload: string) =>
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload,
        });
    const setError = (message: string) =>
        dispatch({ type: ActionTypes.SET_ERROR, payload: message });
    const setQuestions = (questionsState: QuizQuestion[]) =>
        dispatch({ type: ActionTypes.SET_QUESTIONS, payload: questionsState });

    const checkAnswer = (userAnswer: string, expectedAnswer: string, userQuestion: string) =>
        dispatch({
            type: ActionTypes.CHECK_ANSWER,
            payload: {
                userAnswer,
                expectedAnswer,
                userQuestion,
            },
        });

    const nextQuestion = () => dispatch({ type: ActionTypes.NEXT_QUESTION });

    const value = useMemo(
        () => ({
            state,
            startQuiz,
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
        <QuizStoreContext.Provider value={value}>{children}</QuizStoreContext.Provider>
    );
};
