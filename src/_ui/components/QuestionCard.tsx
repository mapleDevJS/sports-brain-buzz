'use client';

import React from 'react';

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
}) => (
    <Wrapper>
        <QuestionNumber currentQuestionNumber={questionNr} totalQuestionCount={totalQuestions} />
        <QuestionText question={question} />
        <div>
            {answers.map((answer, index) => (
                <AnswerButton
                    key={`answer-${index}-${answer.substring(0, 20)}`}
                    answer={answer}
                    userAnswer={userAnswer}
                    onClick={onAnswerSelected}
                />
            ))}
        </div>
    </Wrapper>
);

const MemoizedQuestionCard = React.memo(QuestionCard);

export default MemoizedQuestionCard;
