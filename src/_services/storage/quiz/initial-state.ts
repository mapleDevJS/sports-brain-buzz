import { INITIAL_QUESTION_NUMBER, INITIAL_SCORE } from '../../../constants/app.constants.ts';
import { QuizState } from '../../../types/quiz-state.type.ts';

export const initialState: QuizState = {
    loading: false,
    questions: [],
    currentQuestionNumber: INITIAL_QUESTION_NUMBER,
    userAnswers: [],
    score: INITIAL_SCORE,
    gameOver: true,
    error: null,
};
