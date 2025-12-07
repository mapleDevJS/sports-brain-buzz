'use client';

import React from 'react';
import styled from 'styled-components';

import { AnswerEntity } from '../../_domain/entities/answer.entity';

type Props = {
    userAnswers: AnswerEntity[];
    score: number;
    totalQuestions: number;
    onRestart: () => void;
};

const Wrapper = styled.div`
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #00d4ff 0%, #0095ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 1px;
`;

const ScoreSummary = styled.p`
    text-align: center;
    font-size: 1.5rem;
    color: #cbd5e1;
    margin-bottom: 2rem;
    font-weight: 500;
`;

const QuestionItem = styled.div<{ $isCorrect: boolean }>`
    padding: 1.5rem;
    margin-bottom: 1rem;
    background: ${(props) =>
        props.$isCorrect
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)'};
    border: 2px solid
        ${(props) => (props.$isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)')};
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: ${(props) =>
            props.$isCorrect
                ? '0 8px 24px rgba(16, 185, 129, 0.2)'
                : '0 8px 24px rgba(239, 68, 68, 0.2)'};
    }
`;

const QuestionNumber = styled.div`
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #64748b;
    margin-bottom: 0.5rem;
`;

const QuestionText = styled.p`
    font-size: 1.125rem;
    color: #e2e8f0;
    margin-bottom: 1rem;
    font-weight: 500;
    line-height: 1.6;
`;

const AnswerRow = styled.div`
    margin-top: 0.5rem;
    font-size: 0.95rem;
    line-height: 1.6;
`;

const Label = styled.span`
    font-weight: 600;
    color: #94a3b8;
    margin-right: 0.5rem;
`;

const AnswerText = styled.span<{ $isCorrect?: boolean }>`
    color: ${(props) => (props.$isCorrect ? '#10b981' : '#ef4444')};
    font-weight: 500;
`;

const RestartButton = styled.button`
    display: block;
    margin: 2rem auto 0;
    cursor: pointer;
    background: linear-gradient(135deg, #00d4ff 0%, #0095ff 100%);
    border: none;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 212, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    color: #0f1419;
    height: 56px;
    padding: 0 3rem;
    font-family: 'Catamaran', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(0, 212, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    &:active {
        transform: translateY(-1px);
    }

    &:focus-visible {
        outline: 3px solid rgba(0, 212, 255, 0.5);
        outline-offset: 3px;
    }
`;

export const ReviewScreen: React.FC<Props> = ({
    userAnswers,
    score,
    totalQuestions,
    onRestart,
}) => {
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <Wrapper role="region" aria-label="Quiz review">
            <Title>Quiz Review</Title>
            <ScoreSummary>
                You scored {score} out of {totalQuestions} ({percentage}%)
            </ScoreSummary>

            {userAnswers.map((answer, index) => (
                <QuestionItem
                    key={`review-${index}`}
                    $isCorrect={answer.isCorrect}
                    role="article"
                    aria-label={`Question ${index + 1} ${answer.isCorrect ? 'correct' : 'incorrect'}`}
                >
                    <QuestionNumber>Question {index + 1}</QuestionNumber>
                    <QuestionText dangerouslySetInnerHTML={{ __html: answer.userQuestion }} />
                    <AnswerRow>
                        <Label>Your Answer:</Label>
                        <AnswerText
                            $isCorrect={answer.isCorrect}
                            dangerouslySetInnerHTML={{ __html: answer.userAnswer }}
                        />
                    </AnswerRow>
                    {!answer.isCorrect && (
                        <AnswerRow>
                            <Label>Correct Answer:</Label>
                            <AnswerText
                                $isCorrect={true}
                                dangerouslySetInnerHTML={{ __html: answer.expectedAnswer }}
                            />
                        </AnswerRow>
                    )}
                </QuestionItem>
            ))}

            <RestartButton onClick={onRestart} aria-label="Start a new quiz">
                Start New Quiz
            </RestartButton>
        </Wrapper>
    );
};
