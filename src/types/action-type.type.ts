import { ActionTypes } from './action-types.enum';
import { QuizQuestion } from './question-state.type';

export type ActionType =
    | { type: typeof ActionTypes.START_QUIZ }
    | { type: typeof ActionTypes.SET_QUESTIONS; payload: QuizQuestion[] }
    | { type: typeof ActionTypes.NEXT_QUESTION }
    | {
          type: typeof ActionTypes.CHECK_ANSWER;
          payload: { userAnswer: string; expectedAnswer: string; userQuestion: string };
      }
    | { type: typeof ActionTypes.SET_ERROR; payload: string };
