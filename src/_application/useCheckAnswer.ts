import { useQuizStorage } from '../_services/store/storage-adapter.ts';
import { checkAnswer } from './checkAnswer.ts';

export const useCheckAnswer = () => {
    const quizStorage = useQuizStorage();
    return (answer: string) => checkAnswer(answer, { quizStorage });
};
