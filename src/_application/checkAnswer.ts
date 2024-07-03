import { MouseEvent } from 'react';
import { useQuizStorage } from '../_services/storageAdapter.ts';

export const useCheckAnswer = () => {
    const { state, checkAnswer: checkAnswerStorage } = useQuizStorage();

    const checkAnswer = (evt: MouseEvent<HTMLButtonElement>) => {
        if (state.gameOver) return;

        const answer = evt.currentTarget.value;

        const currentQuestion = state.questions[state.currentQuestionNumber];

        checkAnswerStorage(answer, currentQuestion.correct_answer, currentQuestion.question);
    };
    return { checkAnswer };
};
