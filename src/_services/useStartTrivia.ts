import { useQuizStorage } from './storageAdapter.ts';
import { startTrivia } from '../_application/startTrivia.ts';

export const useStartTrivia = () => {
    const quizStorage = useQuizStorage();
    return () => startTrivia({ quizStorage });
};
