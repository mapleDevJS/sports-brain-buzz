import { fetchToken } from './fetchToken.ts';
import { fetchQuestions } from './fetchQuestions.ts';
import { localStorage } from '../_services/storageAdapter.ts';
import { QuizStorageService } from './ports.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
};

export const startTrivia = async (dependencies: Dependencies) => {
    const { quizStorage } = dependencies;
    const { startQuiz, setToken, setError, setFetchTokenError, setQuestions } = quizStorage;

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
