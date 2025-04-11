import React from 'react';

import { generateSanitizedMarkup } from '../_lib/generateSanitizedMarkup.ts';

type QuestionTextProps = {
    question: string;
};

export const QuestionText: React.FC<QuestionTextProps> = ({ question }) => (
    <p dangerouslySetInnerHTML={generateSanitizedMarkup(question)} />
);
