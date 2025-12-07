'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div
                    role="alert"
                    style={{
                        padding: '20px',
                        margin: '20px',
                        border: '2px solid #ff6b6b',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        color: '#fff',
                    }}
                >
                    <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
                    <p>We encountered an unexpected error. Please try refreshing the page.</p>
                    <details style={{ marginTop: '10px' }}>
                        <summary style={{ cursor: 'pointer' }}>Error details</summary>
                        <pre
                            style={{
                                marginTop: '10px',
                                padding: '10px',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '4px',
                                overflow: 'auto',
                            }}
                        >
                            {this.state.error?.toString()}
                        </pre>
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '15px',
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
