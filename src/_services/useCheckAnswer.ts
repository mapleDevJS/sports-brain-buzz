import { MouseEvent } from 'react';

import { checkAnswer } from '../_application/checkAnswer.ts';
import { useQuizStorage } from './store/storageAdapter.ts';

export const useCheckAnswer = () => {
    const quizStorage = useQuizStorage();
    return (evt: MouseEvent<HTMLButtonElement>) => checkAnswer(evt, { quizStorage });
};
