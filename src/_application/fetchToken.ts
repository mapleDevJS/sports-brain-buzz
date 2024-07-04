import { quizApiService } from '../_services/quiz-api.service.ts';
import { localStorage } from '../_services/store/storageAdapter.ts';

export const fetchToken = async (
    setToken: () => void,
    setTokenError: () => void,
): Promise<void> => {
    try {
        const { data } = await quizApiService.fetchToken();

        const token = data.token;
        localStorage.setItem('sessionToken', token);
        setToken();
    } catch (error) {
        setTokenError();
    }
};
