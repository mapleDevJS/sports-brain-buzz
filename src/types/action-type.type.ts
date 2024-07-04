import { ActionTypes } from './action-types.enum.ts';
import { QuestionsState } from './question-state.type.ts';

export type ActionType =
    | { type: typeof ActionTypes.START_QUIZ }
    | { type: typeof ActionTypes.SET_QUESTIONS; payload: QuestionsState[] }
    | { type: typeof ActionTypes.NEXT_QUESTION }
    | {
          type: typeof ActionTypes.CHECK_ANSWER;
          payload: { answer: string; correctAnswer: string; question: string };
      }
    | { type: typeof ActionTypes.SET_ERROR; payload: string }
    | { type: typeof ActionTypes.SET_TOKEN };
