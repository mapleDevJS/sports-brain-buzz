import { useLocalStorage, useQuizStorage } from '../_services/store/storage-adapter.ts';
import { fetchToken } from './fetchToken.ts';

export const useFetchToken = () => {
    const quizStorage = useQuizStorage();
    const localStorage = useLocalStorage();

    return () => fetchToken(quizStorage, localStorage);
};
