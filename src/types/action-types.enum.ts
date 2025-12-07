// Define action types as constants
export const ActionTypes = {
    START_QUIZ: 'START_QUIZ',
    SET_QUESTIONS: 'SET_QUESTIONS',
    NEXT_QUESTION: 'NEXT_QUESTION',
    CHECK_ANSWER: 'CHECK_ANSWER',
    SET_ERROR: 'SET_ERROR',
    UNDO_ANSWER: 'UNDO_ANSWER',
    SHOW_REVIEW: 'SHOW_REVIEW',
} as const;
