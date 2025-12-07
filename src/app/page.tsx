'use client';

import App from '../_ui/components/App';
import { ErrorBoundary } from '../_ui/components/ErrorBoundary';

export default function HomePage() {
    return (
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    );
}
