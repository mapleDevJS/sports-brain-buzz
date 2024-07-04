import React from 'react';

import { createMarkup } from '../_lib/createMarkup.ts';

type QuestionTextProps = {
    question: string;
};

export const QuestionText: React.FC<QuestionTextProps> = ({ question }) => (
    <p dangerouslySetInnerHTML={createMarkup(question)} />
);
