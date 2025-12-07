import { useCallback } from 'react';

import { useQuizStorage } from '../../_services/storage/storageAdapters.ts';

/**
 * React hook for validating user's quiz answer
 *
 * This hook provides functionality to check a user's answer against the correct answer
 * and update the quiz state accordingly. It:
 * - Validates the answer is case-sensitive
 * - Updates the score if the answer is correct
 * - Records the user's answer with correctness status
 * - Prevents answer submission when game is over
 * - Handles missing questions gracefully
 *
 * The hook returns a callback function that accepts the user's answer and performs
 * all necessary state updates based on correctness.
 *
 * @returns {Function} Callback function to check an answer
 * @returns {string} callback.answer - The user's selected answer to validate
 *
 * @example
 * ```typescript
 * function QuizComponent() {
 *   const checkAnswer = useCheckAnswer();
 *
 *   const handleAnswerClick = (userAnswer: string) => {
 *     checkAnswer(userAnswer);
 *     // State is automatically updated with score and answer history
 *   };
 *
 *   return <button onClick={() => handleAnswerClick('Paris')}>Paris</button>;
 * }
 * ```
 *
 * @see {@link useQuizStorage} for quiz state management
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

            // Ensure current question exists before checking answer
            if (!currentQuestion) return;

            // Call the storage service to check the answer
            checkAnswerStorage(answer, currentQuestion.correct_answer, currentQuestion.question);
        },
        [quizStorage],
    );
};
