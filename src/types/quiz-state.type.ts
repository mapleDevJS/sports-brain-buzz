import { AnswerEntity } from '../_domain/entities/answer.entity';
import { QuizQuestion } from './question-state.type';

export type QuizState = {
    loading: boolean;
    questions: QuizQuestion[];
    currentQuestionNumber: number;
    userAnswers: AnswerEntity[];
    score: number;
    gameOver: boolean;
    error: string | null;
};
