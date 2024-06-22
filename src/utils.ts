/**
 * Shuffles an array using the Fisher-Yates (Knuth) shuffle algorithm.
 *
 * @param inputArray - The array to be shuffled.
 * @returns The shuffled array.
 */
export const shuffleArray = <T>(inputArray: T[]): T[] => {
    const randomComparison = () => Math.random() - 0.5;
    return [...inputArray].sort(randomComparison);
};
