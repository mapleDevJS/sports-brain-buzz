import { LocalStorageService, QuizStorageService } from '../_application/ports.ts';
import { useStore } from './store.tsx';
import { localStore } from './local-store.ts';

export function useQuizStorage(): QuizStorageService {
    return useStore();
}

export const localStorage: LocalStorageService = {
    ...localStore(),
};
