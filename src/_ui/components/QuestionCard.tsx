import React from 'react';

// Types
import { AnswerEntity } from '../../_domain/entities/answer.entity.ts';
import { AnswerButton } from './AnswerButton.tsx';
// Styles
import { Wrapper } from './QuestionCard.styles.ts';
import { QuestionNumber } from './QuestionNumber.tsx';
import { QuestionText } from './QuestionText.tsx';

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
            {answers.map((answer) => (
                <AnswerButton
                    key={answer}
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
