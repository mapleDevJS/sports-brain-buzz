import React from 'react';

type QuestionNumberProps = {
    currentQuestionNumber: number;
    totalQuestionCount: number;
};

export const QuestionNumber: React.FC<QuestionNumberProps> = ({
    currentQuestionNumber,
    totalQuestionCount,
}) => (
    <p className="number">
        Question: {currentQuestionNumber} / {totalQuestionCount}
    </p>
);
