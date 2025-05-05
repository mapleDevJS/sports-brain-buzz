import { useCallback } from 'react';

import { useLocalStorage, useQuizStorage } from '../../_services/storage/storageAdapters.ts';
import { startTrivia, TriviaServiceDependencies } from './startTrivia.ts';
import { useFetchQuestions } from './useFetchQuestions.ts';
import { useFetchToken } from './useFetchToken.ts';

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
            };
            return startTrivia(deps, fetchQuestions, fetchToken, delayInMs);
        },
        [quizStorage, localStorage, fetchQuestions, fetchToken],
    );
};
