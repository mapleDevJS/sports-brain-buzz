import { getNextQuestion } from '../_application/getNextQuestion.ts';
import { useQuizStorage } from './store/storage-adapter.ts';

export const useNextQuestion = () => {
    const quizStorage = useQuizStorage();
    return () => getNextQuestion({ quizStorage });
};
