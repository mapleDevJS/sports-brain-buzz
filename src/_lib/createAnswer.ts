import { Answer } from '../_domain/answer.type.ts';

export const createAnswer = (
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string,
): Answer => ({
    question,
    answer,
    correct,
    correctAnswer,
});
