import { ERROR_MESSAGE_BASE } from '../_lib/get-api-error-messages.ts';
import { LocalStorageService, QuizApiService, QuizStorageService } from './ports.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
    localStorage: LocalStorageService;
    quizApiService: QuizApiService;
};

export const fetchToken = async ({
    quizStorage,
    localStorage,
    quizApiService,
}: Dependencies): Promise<void> => {
    const { setFetchTokenError } = quizStorage;
    try {
        const { data } = await quizApiService.fetchToken();

        const token = data.token;
        localStorage.setItem('sessionToken', token);
    } catch (error) {
        setFetchTokenError(`${ERROR_MESSAGE_BASE} Please try again.`);
    }
};
