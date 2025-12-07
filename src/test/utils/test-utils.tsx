import type { RenderResult } from '@testing-library/react';
import { render as rtlRender } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { vi } from 'vitest';

import { LoggerService, QuizApiService } from '../../_application/ports/ports.ts';
import { ServicesProvider } from '../../_services/di/services.tsx';
import { Services } from '../../_services/di/services-context.tsx';
import { StorageProvider } from '../../_services/storage/quiz/quiz-store.tsx';
import { ResponseCode } from '../../types/response-code.enum.ts';
import { mockQuestionData, mockTokenData } from '../mocks/fixtures/quiz-data.ts';

/**
 * Mock logger service for testing
 */
export const createMockLoggerService = (): LoggerService => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
});

/**
 * Mock quiz API service for testing
 */
export const createMockQuizApiService = (): QuizApiService => ({
    fetchQuestions: vi.fn().mockResolvedValue({
        status: 200,
        data: mockQuestionData,
    }),
    fetchToken: vi.fn().mockResolvedValue({
        status: 200,
        data: mockTokenData,
    }),
    resetToken: vi.fn().mockResolvedValue({
        status: 200,
        data: {
            response_code: ResponseCode.Success,
            token: 'mock-session-token-123456',
        },
    }),
});

/**
 * Create mock services for testing
 */
export const createMockServices = (overrides?: Partial<Services>): Services => ({
    loggerService: createMockLoggerService(),
    quizApiService: createMockQuizApiService(),
    ...overrides,
});

/**
 * Custom render options with services
 */
interface CustomRenderOptions {
    services?: Services;
    withStorage?: boolean;
}

/**
 * All Providers wrapper for testing
 */
interface AllProvidersProps {
    children: ReactNode;
    services: Services;
    withStorage: boolean;
}

const AllProviders: React.FC<AllProvidersProps> = ({ children, services, withStorage }) => {
    if (withStorage) {
        return (
            <StorageProvider>
                <ServicesProvider services={services}>{children}</ServicesProvider>
            </StorageProvider>
        );
    }

    return <ServicesProvider services={services}>{children}</ServicesProvider>;
};

/**
 * Custom render function that wraps components with all necessary providers
 *
 * @param ui - The component to render
 * @param options - Render options including custom services
 * @returns Render result with custom utilities
 *
 * @example
 * ```tsx
 * const { getByText } = renderWithProviders(<MyComponent />);
 * ```
 *
 * @example
 * ```tsx
 * // With custom services
 * const mockLogger = createMockLoggerService();
 * const { getByText } = renderWithProviders(<MyComponent />, {
 *   services: { ...createMockServices(), loggerService: mockLogger }
 * });
 * ```
 */
export const renderWithProviders = (
    ui: ReactElement,
    { services = createMockServices(), withStorage = true }: CustomRenderOptions = {},
): RenderResult => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <AllProviders services={services} withStorage={withStorage}>
            {children}
        </AllProviders>
    );

    return rtlRender(ui, { wrapper: Wrapper });
};

/**
 * Re-export everything from React Testing Library except render
 * We export our custom renderWithProviders as render instead
 */
export {
    findByRole,
    findByText,
    fireEvent,
    getByRole,
    getByText,
    queryByRole,
    queryByText,
    screen,
    waitFor,
    within,
} from '@testing-library/react';

/**
 * Export custom render function
 */
export { renderWithProviders as render };
