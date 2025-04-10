import { loggerService } from '../_services/logger.service.ts';
import { useLocalStorage, useQuizStorage } from '../_services/store/storage-adapter.ts';
import { startTrivia } from './startTrivia.ts';
import { useFetchQuestions } from './useFetchQuestions.ts';
import { useFetchToken } from './useFetchToken.ts';

export const useStartTrivia = () => {
    const quizStorage = useQuizStorage();
    const localStorage = useLocalStorage();
    const fetchQuestions = useFetchQuestions();
    const fetchToken = useFetchToken();

    return () =>
        startTrivia({ quizStorage, localStorage, loggerService, fetchQuestions, fetchToken });
};
