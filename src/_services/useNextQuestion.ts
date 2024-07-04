import { nextQuestion } from '../_application/nextQuestion.ts';
import { useQuizStorage } from './store/storageAdapter.ts';

export const useNextQuestion = () => {
    const quizStorage = useQuizStorage();
    return () => nextQuestion({ quizStorage });
};
