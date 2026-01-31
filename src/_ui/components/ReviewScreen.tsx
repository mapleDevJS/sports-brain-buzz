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

const EvaluationPanel = styled.div`
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 149, 255, 0.1) 100%);
    border: 2px solid rgba(0, 212, 255, 0.3);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const EvaluationTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: #00d4ff;
    margin-bottom: 1.5rem;
    text-align: center;
    letter-spacing: 0.5px;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        border-color: rgba(0, 212, 255, 0.3);
        box-shadow: 0 8px 16px rgba(0, 212, 255, 0.15);
    }
`;

const StatValue = styled.div<{ $color?: string }>`
    font-size: 2.5rem;
    font-weight: 800;
    color: ${(props) => props.$color || '#00d4ff'};
    margin-bottom: 0.5rem;
    line-height: 1;
`;

const StatLabel = styled.div`
    font-size: 0.875rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
`;

const PerformanceRating = styled.div<{ $rating: string }>`
    text-align: center;
    padding: 1.5rem;
    background: ${(props) => {
        switch (props.$rating) {
            case 'Excellent':
                return 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)';
            case 'Good':
                return 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)';
            case 'Fair':
                return 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)';
            default:
                return 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)';
        }
    }};
    border: 2px solid
        ${(props) => {
            switch (props.$rating) {
                case 'Excellent':
                    return 'rgba(16, 185, 129, 0.4)';
                case 'Good':
                    return 'rgba(59, 130, 246, 0.4)';
                case 'Fair':
                    return 'rgba(251, 191, 36, 0.4)';
                default:
                    return 'rgba(239, 68, 68, 0.4)';
            }
        }};
    border-radius: 12px;
    margin-top: 1.5rem;
`;

const RatingLabel = styled.div`
    font-size: 0.875rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const RatingValue = styled.div<{ $color: string }>`
    font-size: 2rem;
    font-weight: 800;
    color: ${(props) => props.$color};
    letter-spacing: 1px;
`;

const ReviewTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: #e2e8f0;
    margin: 2rem 0 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
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
    const incorrectAnswers = totalQuestions - score;

    const getPerformanceRating = (pct: number): string => {
        if (pct >= 90) return 'Excellent';
        if (pct >= 70) return 'Good';
        if (pct >= 50) return 'Fair';
        return 'Needs Improvement';
    };

    const getRatingColor = (rating: string): string => {
        switch (rating) {
            case 'Excellent':
                return '#10b981';
            case 'Good':
                return '#3b82f6';
            case 'Fair':
                return '#fbbf24';
            default:
                return '#ef4444';
        }
    };

    const performanceRating = getPerformanceRating(percentage);
    const ratingColor = getRatingColor(performanceRating);

    return (
        <Wrapper role="region" aria-label="Quiz review">
            <Title>Quiz Review</Title>
            <ScoreSummary>
                You scored {score} out of {totalQuestions} ({percentage}%)
            </ScoreSummary>

            <EvaluationPanel>
                <EvaluationTitle>Full Evaluation Score</EvaluationTitle>

                <StatsGrid>
                    <StatCard>
                        <StatValue $color="#10b981">{score}</StatValue>
                        <StatLabel>Correct Answers</StatLabel>
                    </StatCard>

                    <StatCard>
                        <StatValue $color="#ef4444">{incorrectAnswers}</StatValue>
                        <StatLabel>Incorrect Answers</StatLabel>
                    </StatCard>

                    <StatCard>
                        <StatValue $color="#00d4ff">{percentage}%</StatValue>
                        <StatLabel>Accuracy Rate</StatLabel>
                    </StatCard>

                    <StatCard>
                        <StatValue $color="#a78bfa">{totalQuestions}</StatValue>
                        <StatLabel>Total Questions</StatLabel>
                    </StatCard>
                </StatsGrid>

                <PerformanceRating $rating={performanceRating}>
                    <RatingLabel>Performance Rating</RatingLabel>
                    <RatingValue $color={ratingColor}>{performanceRating}</RatingValue>
                </PerformanceRating>
            </EvaluationPanel>

            <ReviewTitle>Detailed Answer Review</ReviewTitle>

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
