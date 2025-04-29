import { useContext } from 'react';

import { ServicesContext } from './services-context';

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};
