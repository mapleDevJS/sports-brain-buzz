import React from 'react';

import { AnswerEntity } from '../../_domain/entities/answer.entity.ts';
import { ButtonWrapper } from './QuestionCard.styles.ts';

type Props = {
    answer: string;
    userAnswer: AnswerEntity | undefined;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const isButtonDisabled = (userAnswer: AnswerEntity | undefined): boolean => !!userAnswer;

export const AnswerButton: React.FC<Props> = ({ answer, userAnswer, onClick }) => {
    const { expectedAnswer, userAnswer: userClickedAnswer } = userAnswer || {};

    const buttonProps = {
        disabled: isButtonDisabled(userAnswer),
        value: answer,
        onClick,
    };

    return (
        <ButtonWrapper
            key={answer}
            correct={expectedAnswer === answer}
            userClicked={userClickedAnswer === answer}
        >
            <button {...buttonProps}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
        </ButtonWrapper>
    );
};
