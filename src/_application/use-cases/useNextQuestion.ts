import { useCallback } from 'react';

import { useQuizStorage } from '../../_services/storage/storageAdapters.ts';

export const useNextQuestion = (): (() => void) => {
    const quizStorage = useQuizStorage();

    return useCallback(() => {
        quizStorage.nextQuestion();
    }, [quizStorage]);
};
