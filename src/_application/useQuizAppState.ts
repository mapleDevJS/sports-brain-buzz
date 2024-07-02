import { useCallback, useReducer, MouseEvent } from 'react';
import { INITIAL_QUESTION_NUMBER, INITIAL_SCORE } from '../constants/app.constants';
import { ActionTypes } from '../store/action-types.enum';
import { quizReducer } from '../store/quiz-reducer';
import { InitialState } from '../store/initial-state.type';
import { fetchToken } from './fetchToken.ts';
import { fetchQuestions } from './fetchQuestions.ts';

// Initial state for the quiz app
const initialState: InitialState = {
    loading: false,
    questions: [],
    currentQuestionNumber: INITIAL_QUESTION_NUMBER,
    userAnswers: [],
    score: INITIAL_SCORE,
    gameOver: true,
    error: null,
    token: null,
};

export const useQuizAppState = () => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const startTrivia = useCallback(async () => {
        dispatch({ type: ActionTypes.START_QUIZ });
        const token = state.token || (await fetchToken(dispatch));
        if (token) await fetchQuestions(token, dispatch);
    }, [state.token]);

    const checkAnswer = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
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
