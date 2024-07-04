import { startTrivia } from '../_application/startTrivia.ts';
import { useQuizStorage } from './store/storageAdapter.ts';

export const useStartTrivia = () => {
    const quizStorage = useQuizStorage();
    return () => startTrivia({ quizStorage });
};
