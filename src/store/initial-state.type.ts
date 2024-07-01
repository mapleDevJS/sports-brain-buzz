import { QuestionsState } from './question-state.type.ts';
import { AnswerObject } from '../types/answer-object.type.ts';

export type InitialState = {
    loading: boolean;
    questions: QuestionsState[];
    currentQuestionNumber: number;
    userAnswers: AnswerObject[];
    score: number;
    gameOver: boolean;
    error: string | null;
};
