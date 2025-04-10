import { LocalStorageService, QuizStorageService } from '../../_application/ports.ts';
import { useLocalStore } from './useLocalStore.ts';
import { useStore } from './useStore.ts';

export function useQuizStorage(): QuizStorageService {
    return useStore();
}

export function useLocalStorage(): LocalStorageService {
    return useLocalStore();
}
