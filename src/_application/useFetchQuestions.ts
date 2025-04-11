import { loggerService } from '../_services/logger.service.ts';
import { useLocalStorage, useQuizStorage } from '../_services/store/storage-adapter.ts';
import { fetchQuestions } from './fetchQuestions.ts';

export const useFetchQuestions = () => {
    const quizStorage = useQuizStorage();
    const localStorage = useLocalStorage();

    return (token: string) => fetchQuestions(token, quizStorage, localStorage, loggerService);
};
