'use client';

import React, { useCallback, useEffect, useRef } from 'react';

// Types
import { AnswerEntity } from '../../_domain/entities/answer.entity';
import { AnswerButton } from './AnswerButton';
// Styles
import { Wrapper } from './QuestionCard.styles';
import { QuestionNumber } from './QuestionNumber';
import { QuestionText } from './QuestionText';

type Props = {
    question: string;
    answers: string[];
    onAnswerSelected: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerEntity | undefined;
    questionNr: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    onAnswerSelected,
    userAnswer,
    questionNr,
    totalQuestions,
}) => {
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState(0);

    useEffect(() => {
        buttonRefs.current = buttonRefs.current.slice(0, answers.length);
    }, [answers.length]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (userAnswer) return;

            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    setFocusedIndex((prev) => (prev + 1) % answers.length);
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    setFocusedIndex((prev) => (prev - 1 + answers.length) % answers.length);
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    buttonRefs.current[focusedIndex]?.click();
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                    e.preventDefault();
                    const index = parseInt(e.key) - 1;
                    if (index < answers.length) {
                        buttonRefs.current[index]?.click();
                    }
                    break;
            }
        },
        [answers.length, focusedIndex, userAnswer],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        buttonRefs.current[focusedIndex]?.focus();
    }, [focusedIndex]);

    return (
        <Wrapper role="group" aria-labelledby="question-text">
            <QuestionNumber
                currentQuestionNumber={questionNr}
                totalQuestionCount={totalQuestions}
            />
            <QuestionText question={question} id="question-text" />
            <fieldset
                aria-label="Answer options"
                style={{ border: 'none', padding: 0, margin: 0 }}
            >
                <legend className="sr-only">Select one answer</legend>
                {answers.map((answer, index) => (
                    <div
                        key={`answer-${index}-${answer.substring(0, 20)}`}
                        ref={(el) => {
                            if (el) {
                                const button = el.querySelector('button');
                                buttonRefs.current[index] = button;
                            }
                        }}
                    >
                        <AnswerButton
                            answer={answer}
                            userAnswer={userAnswer}
                            onClick={onAnswerSelected}
                        />
                    </div>
                ))}
            </fieldset>
        </Wrapper>
    );
};

const MemoizedQuestionCard = React.memo(QuestionCard);

export default MemoizedQuestionCard;
