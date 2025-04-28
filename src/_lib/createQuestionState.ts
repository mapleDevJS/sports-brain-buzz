// Helper function to create a question state
import { Question } from '../_domain/question.type.ts';
import { QuestionsState } from '../types/question-state.type.ts';
import { shuffleArray } from './shuffleArray.ts';

/**
 * Creates a question state by combining the original question with shuffled answers
 *
 * @param question - The original question object containing correct and incorrect answers
 * @returns A new QuestionState object with all answers shuffled into a single array
 * @throws {Error} If question parameter is null or undefined
 *
 */
export const createQuestionState = (question: Question): QuestionsState => {
    if (!question) {
        throw new Error('Question parameter is required');
    }

    return {
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
    };
};
