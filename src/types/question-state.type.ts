import { Question } from './question.type.ts';

export type QuestionsState = Question & { answers: string[] };