import { startTrivia } from '../_application/startTrivia.ts';
import { useLocalStorage, useQuizStorage } from './store/storage-adapter.ts';

export const useStartTrivia = () => {
    const quizStorage = useQuizStorage();
    const localStorage = useLocalStorage();

    return () => startTrivia({ quizStorage, localStorage });
};
