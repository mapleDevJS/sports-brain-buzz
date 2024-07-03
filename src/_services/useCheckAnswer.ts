import { useQuizStorage } from './storageAdapter.ts';
import { checkAnswer } from '../_application/checkAnswer.ts';
import { MouseEvent } from 'react';

export const useCheckAnswer = () => {
    const quizStorage = useQuizStorage();
    return (evt: MouseEvent<HTMLButtonElement>) => checkAnswer(evt, { quizStorage });
};
