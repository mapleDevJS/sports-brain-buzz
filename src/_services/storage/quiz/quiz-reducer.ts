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
    return {
        ...state,
        currentQuestionNumber: nextQuestionNumber,
        gameOver: nextQuestionNumber === TOTAL_QUESTIONS,
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
        default:
            return state;
    }
};
