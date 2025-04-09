/**
 * Shuffles an array using the Fisher-Yates (Knuth) shuffle algorithm.
 *
 * @param inputArray - The array to be shuffled.
 * @param randomFn - (Optional) A custom random number generator function. Defaults to Math.random.
 * @returns A new shuffled array without modifying the original array.
 * @throws {TypeError} If the input is not an array.
 */
export const shuffleArray = <T>(inputArray: T[], randomFn: () => number = Math.random): T[] => {
    if (!Array.isArray(inputArray)) {
        throw new TypeError('Input must be an array.');
    }

    const array = [...inputArray]; // Clone the array to avoid mutation
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(randomFn() * (i + 1)); // Random index between 0 and i (inclusive)
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }

    return array;
};
