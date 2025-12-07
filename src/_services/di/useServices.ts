import { useContext } from 'react';

import { Services, ServicesContext } from './services-context';

/**
 * Custom hook to access application services from context
 *
 * @returns The service object containing loggerService and quizApiService
 * @throws Error if used outside a ServicesProvider component
 */
export const useServices = (): Services => {
    const context = useContext(ServicesContext);

    if (!context) {
        throw new Error(
            'useServices must be used within a ServicesProvider component. ' +
                'Make sure your component is wrapped in a ServicesProvider.',
        );
    }

    return context;
};
