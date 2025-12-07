import React from 'react';

import { sanitizeHtmlContent } from '../../_lib/sanitizeHtmlContent';

interface SanitizedQuestionProps {
    question: string;
    className?: string;
}

export const QuestionText: React.FC<SanitizedQuestionProps> = ({ question, className }) => {
    try {
        return (
            <article
                className={className}
                data-testid="sanitized-question-content"
                dangerouslySetInnerHTML={sanitizeHtmlContent(question)}
            />
        );
    } catch (error) {
        console.error('Failed to sanitize question content:', error);
        return <article className={className}>Unable to display question content</article>;
    }
};
