import React from 'react';

import { sanitizeHtmlContent } from '../../_lib/sanitizeHtmlContent';

interface SanitizedQuestionProps {
    question: string;
    className?: string;
    id?: string;
}

export const QuestionText: React.FC<SanitizedQuestionProps> = ({ question, className, id }) => {
    try {
        return (
            <article
                id={id}
                className={className}
                data-testid="sanitized-question-content"
                dangerouslySetInnerHTML={sanitizeHtmlContent(question)}
            />
        );
    } catch (error) {
        console.error('Failed to sanitize question content:', error);
        return (
            <article id={id} className={className}>
                Unable to display question content
            </article>
        );
    }
};
