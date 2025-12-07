import {
    INITIAL_QUESTION_NUMBER,
    INITIAL_SCORE,
    TOTAL_QUESTIONS,
} from '../../../constants/app.constants';
import { ActionType } from '../../../types/action-type.type';
import { ActionTypes } from '../../../types/action-types.enum';
import { QuizQuestion } from '../../../types/question-state.type';
import { QuizState } from '../../../types/quiz-state.type';
// import { AnswerEntity } from '../../../_domain/entities/answer.entity';

// Define specific payload types
type SubmitAnswerPayload = {
    userAnswer: string;
    expectedAnswer: string;
    userQuestion: string;
};

// Helper function to create type-safe actions
type TypedAction<T extends keyof typeof ActionTypes, P = undefined> = P extends undefined
    ? { type: T }
    : { type: T; payload: P };

const initializeQuiz = (state: QuizState): QuizState => ({
    ...state,
    loading: true,
    gameOver: false,
    error: null,
    questions: [],
    currentQuestionNumber: INITIAL_QUESTION_NUMBER,
    userAnswers: [],
    score: INITIAL_SCORE,
    showReview: false,
});

const loadQuestions = (
    state: QuizState,
    { payload }: TypedAction<typeof ActionTypes.SET_QUESTIONS, QuizQuestion[]>,
): QuizState => ({
    ...state,
    loading: false,
    questions: payload,
});

const advanceToNextQuestion = (state: QuizState): QuizState => {
    const nextQuestionNumber = state.currentQuestionNumber + 1;
    const isLastQuestion = nextQuestionNumber === TOTAL_QUESTIONS;
    return {
        ...state,
        currentQuestionNumber: nextQuestionNumber,
        gameOver: isLastQuestion,
        showReview: isLastQuestion,
    };
};

const processAnswer = (
    state: QuizState,
    { payload }: TypedAction<typeof ActionTypes.CHECK_ANSWER, SubmitAnswerPayload>,
): QuizState => {
    const { userAnswer, expectedAnswer, userQuestion } = payload;
    const isCorrect = expectedAnswer === userAnswer;

    return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        userAnswers: [
            ...state.userAnswers,
            {
                userQuestion,
                userAnswer,
                isCorrect,
                expectedAnswer,
            },
        ],
    };
};

const handleError = (
    state: QuizState,
    { payload }: TypedAction<typeof ActionTypes.SET_ERROR, string>,
): QuizState => ({
    ...state,
    loading: false,
    gameOver: true,
    error: payload,
});

const undoLastAnswer = (state: QuizState): QuizState => {
    if (state.userAnswers.length === 0 || state.currentQuestionNumber === 0) {
        return state;
    }

    const lastAnswer = state.userAnswers[state.userAnswers.length - 1];
    const newScore = lastAnswer.isCorrect ? state.score - 1 : state.score;

    return {
        ...state,
        userAnswers: state.userAnswers.slice(0, -1),
        currentQuestionNumber: state.currentQuestionNumber - 1,
        score: newScore,
        gameOver: false,
        showReview: false,
    };
};

const showReviewScreen = (state: QuizState): QuizState => ({
    ...state,
    showReview: true,
    gameOver: true,
});

export const quizReducer = (state: QuizState, action: ActionType): QuizState => {
    switch (action.type) {
        case ActionTypes.START_QUIZ:
            return initializeQuiz(state);
        case ActionTypes.SET_QUESTIONS:
            return loadQuestions(state, action);
        case ActionTypes.NEXT_QUESTION:
            return advanceToNextQuestion(state);
        case ActionTypes.CHECK_ANSWER:
            return processAnswer(state, action);
        case ActionTypes.SET_ERROR:
            return handleError(state, action);
        case ActionTypes.UNDO_ANSWER:
            return undoLastAnswer(state);
        case ActionTypes.SHOW_REVIEW:
            return showReviewScreen(state);
        default:
            return state;
    }
};
