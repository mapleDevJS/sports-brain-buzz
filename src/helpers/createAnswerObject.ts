import { AnswerObject } from '../types/answer-object.type.ts';

export const createAnswerObject = (
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string,
): AnswerObject => ({
    question,
    answer,
    correct,
    correctAnswer,
});
