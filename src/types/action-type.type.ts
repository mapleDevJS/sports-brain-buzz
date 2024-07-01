import { QuestionsState } from './question-state.type.ts';

// Define action types as constants
export const ActionTypes = {
    START_QUIZ: 'START_QUIZ',
    SET_QUESTIONS: 'SET_QUESTIONS',
    NEXT_QUESTION: 'NEXT_QUESTION',
    CHECK_ANSWER: 'CHECK_ANSWER',
    SET_ERROR: 'SET_ERROR',
} as const;

export type ActionType =
    | { type: typeof ActionTypes.START_QUIZ }
    | { type: typeof ActionTypes.SET_QUESTIONS; payload: QuestionsState[] }
    | { type: typeof ActionTypes.NEXT_QUESTION }
    | {
          type: typeof ActionTypes.CHECK_ANSWER;
          payload: { answer: string; correctAnswer: string; question: string };
      }
    | { type: typeof ActionTypes.SET_ERROR; payload: string };
