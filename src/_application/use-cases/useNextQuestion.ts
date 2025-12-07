import { useCallback } from 'react';

import { useQuizStorage } from '../../_services/storage/storageAdapters.ts';

/**
 * React hook for advancing to the next quiz question
 *
 * This hook provides a simple callback to progress the quiz to the next question.
 * When invoked, it:
 * - Increments the current question number
 * - Checks if the quiz is complete (reached total questions)
 * - Updates game over state if quiz is finished
 * - Maintains quiz state consistency
 *
 * The hook is typically called after a user has answered the current question
 * and is ready to move forward in the quiz.
 *
 * @returns {Function} Callback function to advance to next question
 *
 * @example
 * ```typescript
 * function QuizNavigationComponent() {
 *   const nextQuestion = useNextQuestion();
 *   const currentQuestion = 5;
 *   const hasAnswered = true;
 *
 *   return (
 *     <button
 *       onClick={nextQuestion}
 *       disabled={!hasAnswered}
 *     >
 *       Next Question
 *     </button>
 *   );
 * }
 * ```
 *
 * @see {@link useQuizStorage} for quiz state management
 */
export const useNextQuestion = (): (() => void) => {
    const quizStorage = useQuizStorage();

    return useCallback(() => {
        quizStorage.nextQuestion();
    }, [quizStorage]);
};
