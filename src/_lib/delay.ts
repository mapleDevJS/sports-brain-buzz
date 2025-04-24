/**
 * Creates a Promise that resolves after a specified delay
 * @param delayInMs - The delay duration in milliseconds
 * @param value - Optional value to resolve with (default: undefined)
 * @returns Promise that resolves after the specified delay
 * @throws {RangeError} If delayInMs is negative or not a number
 */
export const delay = <T = void>(delayInMs: number, value?: T): Promise<T> => {
    if (!Number.isFinite(delayInMs) || delayInMs < 0) {
        throw new RangeError(`Delay must be a non-negative number, got: ${delayInMs}`);
    }

    return new Promise<T>((resolve) => {
        setTimeout(() => resolve(value!), delayInMs);
    });
};
