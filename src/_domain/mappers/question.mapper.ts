import { shuffleArray } from '../../_lib/shuffleArray';
import { QuizQuestion } from '../../types/question-state.type';
import { QuestionEntity } from '../entities/question.entity';

export const transformToQuestionState = (question: QuestionEntity): QuizQuestion => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
});
