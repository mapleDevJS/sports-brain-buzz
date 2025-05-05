import { QuestionEntity } from '../_domain/entities/question.entity.ts';

export type QuizQuestion = QuestionEntity & { answers: string[] };
