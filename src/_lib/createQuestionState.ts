// Helper function to create question state
import { Question } from '../_domain/question.type.ts';
import { QuestionsState } from '../_services/store/question-state.type.ts';
import { shuffleArray } from './shuffleArray.ts';

export const createQuestionState = (question: Question): QuestionsState => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
});
