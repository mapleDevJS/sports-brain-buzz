import { startTrivia } from '../_application/startTrivia.ts';
import { useLocalStorage, useQuizStorage } from './store/storageAdapter.ts';
import { useServices } from './store/useServices.ts';

export const useStartTrivia = () => {
    const { quizApiService, loggerService } = useServices();
    const quizStorage = useQuizStorage();
    const localStorage = useLocalStorage();

    return () => startTrivia({ quizStorage, localStorage, quizApiService, loggerService });
};
