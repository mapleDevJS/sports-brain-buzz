import { shuffle } from 'radash';

/**
 * Configuration options for array shuffling.
 */
type ShuffleOptions = {
    /** If true, uses cryptographic randomness (default: true) */
    secure?: boolean;
    /** Maximum allowed length of an input array */
    maxLength?: number;
};

/**
 * Shuffles an array using the radash shuffle implementation with additional safety checks.
 *
 * @template T - The type of elements in the array
 * @param {readonly T[]} inputArray - The array to be shuffled
 * @param {ShuffleOptions} [options] - Optional configuration for the shuffle operation
 * @returns {T[]} A new array with the same elements in random order
 * @throws {TypeError} If the input is not an array
 * @throws {RangeError} If array length exceeds maxLength or MAX_SAFE_INTEGER - 1
 *
 * @example
 * // Basic usage
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffled = shuffleArray(numbers);
 *
 * @example
 * // With maximum length constraint
 * const limited = shuffleArray([1, 2, 3], { maxLength: 5 });
 */
export const shuffleArray = <T>(
    inputArray: readonly T[],
    { maxLength }: Omit<ShuffleOptions, 'secure'> = {},
): T[] => {
    // Input validation
    if (!Array.isArray(inputArray)) {
        throw new TypeError('Input must be an array');
    }

    const arrayLength = inputArray.length;

    // Validate array length
    if (arrayLength > Number.MAX_SAFE_INTEGER - 1) {
        throw new RangeError('Array length exceeds maximum safe integer limit');
    }

    if (maxLength !== undefined && arrayLength > maxLength) {
        throw new RangeError(
            `Array length ${arrayLength} exceeds maximum allowed length ${maxLength}`,
        );
    }

    // Use radash's shuffle function, which handles the actual shuffling
    return shuffle(inputArray);
};
