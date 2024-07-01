import { Question } from '../types/question.type.ts';

export type QuestionsState = Question & { answers: string[] };
