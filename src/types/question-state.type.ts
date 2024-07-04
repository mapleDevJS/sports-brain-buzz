import { Question } from '../_domain/question.type.ts';

export type QuestionsState = Question & { answers: string[] };
