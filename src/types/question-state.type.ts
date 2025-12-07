import { QuestionEntity } from '../_domain/entities/question.entity';

export type QuizQuestion = QuestionEntity & { answers: string[] };
