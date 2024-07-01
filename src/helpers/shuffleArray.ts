/**
 * Shuffles an array using the Fisher-Yates (Knuth) shuffle algorithm.
 *
 * @param inputArray - The array to be shuffled.
 * @returns The shuffled array.
 */
export const shuffleArray = <T>(inputArray: T[]): T[] => {
    const array = [...inputArray];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
