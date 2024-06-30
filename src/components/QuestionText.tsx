import React from 'react';
import { createMarkup } from '../helpers/createMarkup.ts';

type QuestionTextProps = {
    question: string;
};

export const QuestionText: React.FC<QuestionTextProps> = ({ question }) => (
    <p dangerouslySetInnerHTML={createMarkup(question)} />
);
