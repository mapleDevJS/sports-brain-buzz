// A custom error class for retry-related errors
class RetryError extends Error {
    public originalError: unknown;
    public attempts: number;

    constructor(message: string, originalError: unknown, attempts: number) {
        super(message);
        this.name = 'RetryError';
        this.originalError = originalError;
        this.attempts = attempts;
    }
}

// Options for configuring retry behavior
export interface RetryOptions {
    initialDelay: number; // Starting delay for retries
    maxRetries: number; // Maximum number of retry attempts
    backoffStrategy?: (delay: number, attempt: number) => number; // Custom backoff logic
    shouldRetry?: (error: unknown, attempt: number) => boolean; // Decide whether to retry
    signal?: AbortSignal; // Allow retries to be canceled
    onRetry?: (attempt: number, delay: number, error: unknown) => void; // Hook for observing retries
}

// Retry function with configurable backoff and retry logic
export const retryWithBackoff = async <T>(
    operation: () => Promise<T>,
    options: RetryOptions,
): Promise<T> => {
    const {
        initialDelay,
        maxRetries,
        backoffStrategy = (delay) => delay * 2, // Default exponential backoff
        shouldRetry = () => true, // Default: always retry on errors
        signal,
        onRetry,
    } = options;

    // Validate `initialDelay` and `maxRetries` to prevent invalid configurations
    if (initialDelay <= 0) {
        throw new Error("'initialDelay' must be a positive number.");
    }
    if (maxRetries <= 0) {
        throw new Error("'maxRetries' must be a positive number.");
    }

    let attempt = 0;
    let backoffDelay = initialDelay;

    // Utility to delay execution while supporting cancellation
    const applyBackoffDelay = async (delay: number): Promise<void> =>
        new Promise((resolve, reject) => {
            const timeoutId = setTimeout(resolve, delay);

            // Handle signal cancellation during delay period
            signal?.addEventListener('abort', () => {
                clearTimeout(timeoutId);
                reject(new Error('Retry operation was cancelled.'));
            });
        });

    // Pre-check for signal cancellation before entering retry loop
    if (signal?.aborted) {
        throw new Error('Retry operation was cancelled before execution started.');
    }

    // Apply the initial delay before the first attempt
    await applyBackoffDelay(initialDelay);

    // Main retry logic
    while (attempt < maxRetries) {
        try {
            // Attempt the provided operation
            return await operation();
        } catch (error) {
            attempt++;

            // Check if further retries are allowed
            if (attempt >= maxRetries || !shouldRetry(error, attempt)) {
                throw new RetryError(`Operation failed after ${attempt} attempts.`, error, attempt);
            }

            // Hook for observing retry events
            if (onRetry) {
                onRetry(attempt, backoffDelay, error);
            }

            // Apply the current backoff delay
            await applyBackoffDelay(backoffDelay);

            // Compute the next backoff delay using the strategy (ensure it's non-negative)
            backoffDelay = Math.max(0, backoffStrategy(backoffDelay, attempt));
        }
    }

    // While logic should prevent reaching this point, provide a fallback error
    throw new Error('Unexpected error: retry logic terminated unexpectedly.');
};
