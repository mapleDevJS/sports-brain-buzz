'use client';

import { FC, ReactNode } from 'react';

import { Services, ServicesContext } from './services-context';

interface ProviderProps {
    services: Services;
    children: ReactNode;
}

export const ServicesProvider: FC<ProviderProps> = ({ services, children }) => {
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>
    );
};
