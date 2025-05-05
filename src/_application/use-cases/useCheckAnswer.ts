import { useCallback } from 'react';

import { useQuizStorage } from '../../_services/storage/storageAdapters.ts';

/**
 * Hook for checking user's answer against the correct answer
 * @returns A callback function that handles answer checking logic
 */
export const useCheckAnswer = () => {
    const quizStorage = useQuizStorage();

    return useCallback(
        (answer: string): void => {
            const { state, checkAnswer: checkAnswerStorage } = quizStorage;

            // If the game is over, don't process the answer
            if (state.gameOver) return;

            // Get the current question from the quiz state
            const currentQuestion = state.questions[state.currentQuestionNumber];

            // Call the storage service to check the answer
            checkAnswerStorage(answer, currentQuestion.correct_answer, currentQuestion.question);
        },
        [quizStorage],
    );
};
