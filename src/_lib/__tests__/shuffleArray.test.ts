import { describe, expect, it } from 'vitest';

import { shuffleArray } from '../shuffleArray';

describe('shuffleArray', () => {
    it('returns array with same length', () => {
        const input = [1, 2, 3, 4, 5];
        const result = shuffleArray(input);
        expect(result).toHaveLength(input.length);
    });

    it('contains all original elements', () => {
        const input = [1, 2, 3, 4, 5];
        const result = shuffleArray(input);
        input.forEach((item) => {
            expect(result).toContain(item);
        });
    });

    it('does not mutate original array', () => {
        const input = [1, 2, 3, 4, 5];
        const copy = [...input];
        shuffleArray(input);
        expect(input).toEqual(copy);
    });

    it('handles empty array', () => {
        const result = shuffleArray([]);
        expect(result).toEqual([]);
    });

    it('handles single element array', () => {
        const result = shuffleArray([1]);
        expect(result).toEqual([1]);
    });
});
