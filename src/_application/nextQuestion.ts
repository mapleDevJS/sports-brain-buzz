import { useQuizStorage } from '../_services/storageAdapter.ts';

export const useNextQuestion = () => {
    const { nextQuestion: nextQuestion2 } = useQuizStorage();

    const nextQuestion = () => {
        nextQuestion2();
    };
    return { nextQuestion };
};
