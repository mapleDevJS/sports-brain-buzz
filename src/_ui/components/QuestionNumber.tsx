import React from 'react';
import styled from 'styled-components';

const QuestionNumberContainer = styled.p`
    font-size: 0.875rem;
    font-weight: 600;
    color: #94a3b8;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.9;
`;

const CurrentNumber = styled.span`
    color: #00d4ff;
    font-size: 1.125rem;
    font-weight: 700;
`;

type QuestionNumberProps = {
    currentQuestionNumber: number;
    totalQuestionCount: number;
};

export const QuestionNumber: React.FC<QuestionNumberProps> = ({
    currentQuestionNumber,
    totalQuestionCount,
}) => (
    <QuestionNumberContainer className="number">
        Question: <CurrentNumber>{currentQuestionNumber}</CurrentNumber> / {totalQuestionCount}
    </QuestionNumberContainer>
);
