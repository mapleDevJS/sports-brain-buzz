import { ERROR_MESSAGE_BASE } from '../_lib/getApiErrorMessages.ts';
import { loggerService } from '../_services/logger.service.ts';
import { quizApiService } from '../_services/quiz-api.service.ts';
import { LocalStorageService, QuizStorageService } from './ports.ts';

export const fetchToken = async (
    quizStorage: QuizStorageService,
    localStorage: LocalStorageService,
): Promise<void> => {
    const { setFetchTokenError } = quizStorage;

    try {
        // Use type annotation to clarify expected API response shape
        const { data }: { data: { token: string } } = await quizApiService.fetchToken();

        // Directly set token into localStorage
        localStorage.setItem('sessionToken', data.token);
    } catch (error) {
        // Safely handle error types
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        loggerService.error(`Token fetch failed: ${errorMessage}`); // Helpful for debugging

        setFetchTokenError(`${ERROR_MESSAGE_BASE} Please try again.`);
    }
};
