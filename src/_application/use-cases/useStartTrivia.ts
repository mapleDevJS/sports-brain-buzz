import { useCallback } from 'react';

import { useLocalStorage, useQuizStorage } from '../../_services/storage/storageAdapters';
import { startTrivia, TriviaServiceDependencies } from './startTrivia';
import { useFetchQuestions } from './useFetchQuestions';
import { useFetchToken } from './useFetchToken';

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
