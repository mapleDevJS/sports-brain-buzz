import { useCallback } from 'react';

import { useQuizStorage } from '../../_services/storage/storageAdapters';

/**
 * Hook for checking user's answer against the correct answer
 * @returns A callback function that handles answer checking logic
 */
export const useCheckAnswer = () => {
    const quizStorage = useQuizStorage();

    return useCallback(
        (answer: string): void => {
            const { state, checkAnswer: checkAnswerStorage } = quizStorage;

            if (state.gameOver) return;

            const { currentQuestionNumber, questions } = state;

            if (currentQuestionNumber < 0 || currentQuestionNumber >= questions.length) {
                console.error(`Invalid question number: ${currentQuestionNumber}`);
                return;
            }

            const currentQuestion = questions[currentQuestionNumber];

            if (!currentQuestion) {
                console.error(`Question not found at index: ${currentQuestionNumber}`);
                return;
            }

            checkAnswerStorage(answer, currentQuestion.correct_answer, currentQuestion.question);
        },
        [quizStorage],
    );
};
