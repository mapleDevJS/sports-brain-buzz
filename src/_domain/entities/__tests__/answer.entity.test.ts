import { describe, expect, it } from 'vitest';

import { AnswerEntity } from '../answer.entity';

describe('AnswerEntity', () => {
    it('creates an answer entity with all properties', () => {
        const answer: AnswerEntity = {
            expectedAnswer: 'Paris',
            userAnswer: 'Paris',
            question: 'What is the capital of France?',
            correct: true,
        };

        expect(answer.expectedAnswer).toBe('Paris');
        expect(answer.userAnswer).toBe('Paris');
        expect(answer.question).toBe('What is the capital of France?');
        expect(answer.correct).toBe(true);
    });

    it('handles incorrect answers', () => {
        const answer: AnswerEntity = {
            expectedAnswer: 'Paris',
            userAnswer: 'London',
            question: 'What is the capital of France?',
            correct: false,
        };

        expect(answer.correct).toBe(false);
        expect(answer.userAnswer).not.toBe(answer.expectedAnswer);
    });
});
