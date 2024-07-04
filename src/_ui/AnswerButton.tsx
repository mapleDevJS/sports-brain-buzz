import React from 'react';

import { Answer } from '../_domain/answer.type.ts';
import { ButtonWrapper } from './QuestionCard.styles.ts';

type Props = {
    answer: string;
    userAnswer: Answer | undefined;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const isButtonDisabled = (userAnswer: Answer | undefined): boolean => !!userAnswer;

export const AnswerButton: React.FC<Props> = ({ answer, userAnswer, onClick }) => {
    const { correctAnswer, answer: userClickedAnswer } = userAnswer || {};

    const buttonProps = {
        disabled: isButtonDisabled(userAnswer),
        value: answer,
        onClick,
    };

    return (
        <ButtonWrapper
            key={answer}
            correct={correctAnswer === answer}
            userClicked={userClickedAnswer === answer}
        >
            <button {...buttonProps}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
        </ButtonWrapper>
    );
};
