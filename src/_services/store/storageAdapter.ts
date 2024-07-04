import { LocalStorageService, QuizStorageService } from '../../_application/ports.ts';
import { localStore } from './local-store.ts';
import { useStore } from './useStore.ts';

export function useQuizStorage(): QuizStorageService {
    return useStore();
}

export const localStorage: LocalStorageService = {
    ...localStore(),
};
