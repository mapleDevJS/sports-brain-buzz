import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ErrorBoundary } from '../ErrorBoundary';

const ThrowError = () => {
    throw new Error('Test error');
};

describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div>Test content</div>
            </ErrorBoundary>,
        );

        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders error message when child throws error', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>,
        );

        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();

        consoleError.mockRestore();
    });

    it('renders custom fallback when provided', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <ErrorBoundary fallback={<div>Custom error message</div>}>
                <ThrowError />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Custom error message')).toBeInTheDocument();

        consoleError.mockRestore();
    });
});
