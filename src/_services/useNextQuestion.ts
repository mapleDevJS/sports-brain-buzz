import { useQuizStorage } from './storageAdapter.ts';
import { nextQuestion } from '../_application/nextQuestion.ts';

export const useNextQuestion = () => {
    const quizStorage = useQuizStorage();
    return () => nextQuestion({ quizStorage });
};
