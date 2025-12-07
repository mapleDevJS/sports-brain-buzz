import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import QuestionCard from '../QuestionCard';

describe('QuestionCard', () => {
    const mockProps = {
        question: 'What is 2+2?',
        answers: ['3', '4', '5', '6'],
        onAnswerSelected: vi.fn(),
        userAnswer: undefined,
        questionNr: 1,
        totalQuestions: 10,
    };

    it('renders question number', () => {
        render(<QuestionCard {...mockProps} />);
        expect(screen.getByText(/Question: 1 \/ 10/i)).toBeInTheDocument();
    });

    it('renders question text', () => {
        render(<QuestionCard {...mockProps} />);
        expect(screen.getByText('What is 2+2?')).toBeInTheDocument();
    });

    it('renders all answer buttons', () => {
        render(<QuestionCard {...mockProps} />);
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('calls onAnswerSelected when answer is clicked', async () => {
        const user = userEvent.setup();
        render(<QuestionCard {...mockProps} />);

        const button = screen.getByText('4').closest('button');
        if (button) {
            await user.click(button);
        }

        expect(mockProps.onAnswerSelected).toHaveBeenCalled();
    });

    it('has proper ARIA attributes', () => {
        render(<QuestionCard {...mockProps} />);
        const groups = screen.getAllByRole('group');
        expect(groups[0]).toHaveAttribute('aria-labelledby', 'question-text');
    });
});
