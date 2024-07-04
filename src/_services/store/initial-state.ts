import { INITIAL_QUESTION_NUMBER, INITIAL_SCORE } from '../../constants/app.constants.ts';
import { InitialState } from '../../types/initial-state.type.ts';

export const initialState: InitialState = {
    loading: false,
    questions: [],
    currentQuestionNumber: INITIAL_QUESTION_NUMBER,
    userAnswers: [],
    score: INITIAL_SCORE,
    gameOver: true,
    error: null,
};
