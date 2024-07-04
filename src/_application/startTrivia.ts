import { localStorage } from '../_services/store/storageAdapter.ts';
import { fetchQuestions } from './fetchQuestions.ts';
import { fetchToken } from './fetchToken.ts';
import { QuizStorageService } from './ports.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
};

export const startTrivia = async ({ quizStorage }: Dependencies) => {
    const { startQuiz } = quizStorage;

    startQuiz();
    const token = localStorage.getItem('sessionToken');

    if (!token) {
        await fetchToken(quizStorage);
    }
    const existingToken = localStorage.getItem('sessionToken');
    if (existingToken) {
        await fetchQuestions(existingToken, quizStorage);
    }
};
