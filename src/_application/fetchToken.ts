import { ERROR_MESSAGE_BASE } from '../_lib/get-api-error-messages.ts';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { localStorage } from '../_services/store/storageAdapter.ts';
import { QuizStorageService } from './ports.ts';

export const fetchToken = async (quizStorage: QuizStorageService): Promise<void> => {
    const { setToken, setFetchTokenError } = quizStorage;
    try {
        const { data } = await quizApiService.fetchToken();

        const token = data.token;
        localStorage.setItem('sessionToken', token);
        setToken();
    } catch (error) {
        setFetchTokenError(`${ERROR_MESSAGE_BASE} Please try again.`);
    }
};
