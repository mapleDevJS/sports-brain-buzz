import { fetchToken } from './fetchToken.ts';
import { fetchQuestions } from './fetchQuestions.ts';
import { localStorage, useQuizStorage } from '../_services/storageAdapter.ts';

export const useStartTrivia = () => {
    const { startQuiz, setToken, setError, setFetchTokenError, setQuestions } = useQuizStorage();

    const startTrivia = async () => {
        startQuiz();
        const token = localStorage.getItem('sessionToken');

        if (!token) {
            await fetchToken(setToken, setFetchTokenError);
        }
        const existingToken = localStorage.getItem('sessionToken');
        if (existingToken) {
            await fetchQuestions(existingToken, setError, startQuiz, setQuestions);
        }
    };
    return { startTrivia };
};
