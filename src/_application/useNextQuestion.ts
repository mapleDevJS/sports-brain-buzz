import { useQuizStorage } from '../_services/store/storage-adapter.ts';
import { getNextQuestion } from './getNextQuestion.ts';

export const useNextQuestion = () => {
    const quizStorage = useQuizStorage();
    return () => getNextQuestion({ quizStorage });
};
