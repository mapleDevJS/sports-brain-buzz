import { LocalStorageService, QuizStorageService } from '../../_application/ports/ports';
import { localStore } from './local/local-store';
import { useStore } from './quiz/useStore';

export function useQuizStorage(): QuizStorageService {
    return useStore();
}

export function useLocalStorage(): LocalStorageService {
    return localStore();
}
