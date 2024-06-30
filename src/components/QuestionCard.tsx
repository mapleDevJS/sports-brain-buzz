import React from 'react';
// Types
import { AnswerObject } from './App.tsx';
// Styles
import { ButtonWrapper, Wrapper } from './QuestionCard.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
};

const AnswerButton: React.FC<{
    answer: string;
    userAnswer: AnswerObject | undefined;
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ answer, userAnswer, callback }) => {
    const isDisabled = !!userAnswer;
    return (
        <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
        >
            <button disabled={isDisabled} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
        </ButtonWrapper>
    );
};

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions,
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map((answer) => (
                <AnswerButton
                    key={answer}
                    answer={answer}
                    userAnswer={userAnswer}
                    callback={callback}
                />
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;
