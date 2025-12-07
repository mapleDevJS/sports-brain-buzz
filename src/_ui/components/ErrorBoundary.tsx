// @ts-expect-error - React is required in scope for JSX in class components
import React, { Component, ErrorInfo, ReactNode } from 'react';

import { LoggerService } from '../../_application/ports/ports.ts';

interface Props {
    children: ReactNode;
    loggerService: LoggerService;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        const { loggerService } = this.props;
        loggerService.error('React Error Boundary caught an error', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        padding: '20px',
                        textAlign: 'center',
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    <h1>Oops! Something went wrong</h1>
                    <p>We&apos;re sorry for the inconvenience. Please try refreshing the page.</p>
                    {import.meta.env.DEV && this.state.error && (
                        <details style={{ marginTop: '20px', textAlign: 'left' }}>
                            <summary>Error details (development only)</summary>
                            <pre
                                style={{
                                    background: '#f5f5f5',
                                    padding: '10px',
                                    overflow: 'auto',
                                }}
                            >
                                {this.state.error.toString()}
                                {this.state.error.stack}
                            </pre>
                        </details>
                    )}
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            fontSize: '16px',
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
