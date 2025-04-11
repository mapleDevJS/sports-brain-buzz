// Error message for negative delay
const NON_NEGATIVE_DELAY_ERROR = 'Delay time must be a non-negative number.';

/**
 * Delays execution for a specified time and resolves with a given result.
 *
 * @param {number} delayMs - The delay time in milliseconds (must be non-negative).
 * @param {number} [result=2] - The value to resolve the Promise with after the delay.
 * @returns {Promise<number>} A Promise that resolves after the specified delay with the given result.
 * @throws {Error} If the delayMs is negative.
 */
export const delay = (delayMs: number, result: number = 2): Promise<number> => {
    // Ensure delay time is non-negative
    if (delayMs < 0) {
        return Promise.reject(new Error(NON_NEGATIVE_DELAY_ERROR));
    }

    // Use _wait helper to manage delay logic (even for delayMs = 0)
    return _wait(delayMs, result);
};

/**
 * Handles the delay and resolves the promise after a timeout.
 *
 * @param {number} delayMs - The time in milliseconds to wait before resolving.
 * @param {number} result - The value to resolve the Promise with after the delay.
 * @returns {Promise<number>} A Promise resolving after the given delay.
 */
const _wait = (delayMs: number, result: number): Promise<number> =>
    new Promise((resolve) => setTimeout(() => resolve(result), delayMs));
