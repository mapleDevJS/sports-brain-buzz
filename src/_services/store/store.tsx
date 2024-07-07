import { FC, ReactNode, useMemo, useReducer } from 'react';

import { ActionTypes } from '../../types/action-types.enum.ts';
import { QuestionsState } from '../../types/question-state.type.ts';
import { initialState } from './initial-state.ts';
import { quizReducer } from './quiz-reducer.ts';
import { StoreContext } from './store-context.ts';

interface ProviderProps {
    children: ReactNode;
}

export const Provider: FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const startQuiz = () => dispatch({ type: ActionTypes.START_QUIZ });
    const setFetchTokenError = (payload: string) =>
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload,
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
