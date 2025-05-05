import { LocalStorageService, QuizStorageService } from '../../_application/ports/ports.ts';
import { localStore } from './local/local-store.ts';
import { useStore } from './quiz/useStore.ts';

export function useQuizStorage(): QuizStorageService {
    return useStore();
}

export function useLocalStorage(): LocalStorageService {
    return localStore();
}
