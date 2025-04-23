/**
 * Configuration options for array shuffling.
 */
type ShuffleOptions = {
    /** If true, uses cryptographic randomness (default: true) */
    secure?: boolean;
    /** Maximum allowed length of input array */
    maxLength?: number;
};

/**
 * Constants for array shuffling operations
 */
const SHUFFLE_CONSTANTS = {
    UINT32_MAX: 0xffffffff,
    MIN_LENGTH_FOR_SHUFFLE: 2,
} as const;

/**
 * Shuffles an array using the Fisher-Yates (Knuth) shuffle algorithm.
 *
 * @template T - The type of elements in the array
 * @param {readonly T[]} inputArray - The array to be shuffled
 * @param {ShuffleOptions} [options] - Optional configuration for the shuffle operation
 * @returns {T[]} A new array with the same elements in random order
 * @throws {TypeError} If the input is not an array
 * @throws {Error} If secure randomness is required but not available
 * @throws {RangeError} If array length exceeds maxLength or MAX_SAFE_INTEGER - 1
 *
 * @description
 * Implementation characteristics:
 * - Time Complexity: O(n) where n is the length of the array
 * - Space Complexity: O(n) as it creates a copy of the input array
 * - Maintains input array immutability
 * - Uses cryptographically secure shuffling by default
 * - Implements Fisher-Yates (Knuth) shuffle algorithm
 * - Handles edge cases including empty arrays and single elements
 *
 * @example
 * // Basic usage
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffled = shuffleArray(numbers);
 *
 * @example
 * // With non-secure random numbers
 * const data = ['A', 'B', 'C'];
 * const shuffled = shuffleArray(data, { secure: false });
 *
 * @example
 * // With maximum length constraint
 * const limited = shuffleArray([1, 2, 3], { maxLength: 5 });
 */
export const shuffleArray = <T>(
    inputArray: readonly T[],
    { secure = true, maxLength }: ShuffleOptions = {},
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

    // Early return for small arrays
    if (arrayLength < SHUFFLE_CONSTANTS.MIN_LENGTH_FOR_SHUFFLE) {
        return [...inputArray];
    }

    // Create a copy to maintain immutability
    const array = [...inputArray];

    // Check for secure random number generation availability
    const hasSecureRandom =
        typeof crypto !== 'undefined' &&
        'getRandomValues' in crypto &&
        typeof crypto.getRandomValues === 'function';

    if (secure && !hasSecureRandom) {
        throw new Error('Secure random number generation is not available');
    }

    const getRandomIndex = (max: number): number => {
        if (secure && hasSecureRandom) {
            const randomBuffer = new Uint32Array(1);
            crypto.getRandomValues(randomBuffer);
            return Math.floor((randomBuffer[0] / (SHUFFLE_CONSTANTS.UINT32_MAX + 1)) * max);
        }
        return Math.floor(Math.random() * max);
    };

    // Fisher-Yates shuffle implementation
    for (let i = arrayLength - 1; i > 0; i--) {
        const j = getRandomIndex(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};
