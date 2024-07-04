import { checkAnswer } from '../_application/checkAnswer.ts';
import { useQuizStorage } from './store/storageAdapter.ts';

export const useCheckAnswer = () => {
    const quizStorage = useQuizStorage();
    return (answer: string) => checkAnswer(answer, { quizStorage });
};
