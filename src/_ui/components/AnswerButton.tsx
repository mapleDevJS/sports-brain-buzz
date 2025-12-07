import React, { memo, useMemo } from 'react';

import { AnswerEntity } from '../../_domain/entities/answer.entity';
import { sanitizeHtmlContent } from '../../_lib/sanitizeHtmlContent';
import { ButtonWrapper } from './QuestionCard.styles';

type Props = {
    answer: string;
    userAnswer: AnswerEntity | undefined;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const isButtonDisabled = (userAnswer: AnswerEntity | undefined): boolean => !!userAnswer;

const AnswerButtonComponent: React.FC<Props> = ({ answer, userAnswer, onClick }) => {
    const { expectedAnswer, userAnswer: userClickedAnswer } = userAnswer || {};

    const buttonProps = useMemo(
        () => ({
            disabled: isButtonDisabled(userAnswer),
            value: answer,
            onClick,
        }),
        [userAnswer, answer, onClick],
    );

    const sanitizedAnswer = useMemo(() => sanitizeHtmlContent(answer), [answer]);

    const isCorrect = expectedAnswer === answer;
    const isClicked = userClickedAnswer === answer;

    return (
        <ButtonWrapper $correct={isCorrect} $userClicked={isClicked}>
            <button {...buttonProps}>
                <span dangerouslySetInnerHTML={sanitizedAnswer} />
            </button>
        </ButtonWrapper>
    );
};

export const AnswerButton = memo(AnswerButtonComponent);
