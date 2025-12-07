import { useCallback } from 'react';

import { useLocalStorage, useQuizStorage } from '../../_services/storage/storageAdapters.ts';
import { startTrivia, TriviaServiceDependencies } from './startTrivia.ts';
import { useFetchQuestions } from './useFetchQuestions.ts';
import { useFetchToken } from './useFetchToken.ts';

/**
 * React hook that orchestrates the complete trivia quiz initialization
 *
 * This is the main coordination hook that brings together all the individual
 * use cases needed to start a trivia quiz. It:
 * - Assembles all required service dependencies
 * - Coordinates token fetching (or reuse)
 * - Manages question fetching with retry logic
 * - Handles API rate limiting with delays
 * - Initializes quiz state properly
 *
 * The hook returns a callback function that can be invoked to start the quiz,
 * optionally with a delay for rate limiting purposes.
 *
 * @returns {Function} Async callback to start the trivia quiz
 * @returns {number} [callback.delayInMs] - Optional delay before fetching (for rate limiting)
 *
 * @example
 * ```typescript
 * function StartQuizButton() {
 *   const startTrivia = useStartTrivia();
 *   const [loading, setLoading] = useState(false);
 *
 *   const handleClick = async () => {
 *     setLoading(true);
 *     try {
 *       // Start immediately
 *       await startTrivia();
 *     } catch (error) {
 *       console.error('Failed to start quiz:', error);
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleClick} disabled={loading}>
 *       {loading ? 'Loading...' : 'Start Quiz'}
 *     </button>
 *   );
 * }
 *
 * // With rate limit delay
 * await startTrivia(5000); // Wait 5 seconds before fetching
 * ```
 *
 * @see {@link startTrivia} for the core orchestration logic
 * @see {@link useFetchToken} for token management
 * @see {@link useFetchQuestions} for question fetching
 */
export const useStartTrivia = () => {
    const quizStorage = useQuizStorage();
    const localStorage = useLocalStorage();
    const fetchQuestions = useFetchQuestions();
    const fetchToken = useFetchToken();

    // Return a memoized function that initializes the trivia
    return useCallback(
        (delayInMs?: number) => {
            // Create a dependency object inside the callback
            const deps: TriviaServiceDependencies = {
                quizStorage,
                localStorage,
                fetchQuestions,
                fetchToken,
            };
            return startTrivia(deps, delayInMs);
        },
        [quizStorage, localStorage, fetchQuestions, fetchToken],
    );
};
