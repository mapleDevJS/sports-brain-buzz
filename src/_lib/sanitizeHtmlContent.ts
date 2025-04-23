import DOMPurify from 'dompurify';

/** Type representing sanitized HTML content for React's dangerouslySetInnerHTML */
type SanitizedHtml = {
    __html: string;
};

const ERROR_MESSAGES = {
    NULL_UNDEFINED: 'HTML content cannot be null or undefined',
} as const;

/**
 * Sanitizes HTML content for safe rendering in React components.
 * @param html - The HTML string to be sanitized
 * @returns Object containing sanitized HTML for use with dangerouslySetInnerHTML
 * @throws Error if input is null, undefined, or not a string
 */
export const sanitizeHtmlContent = (html: string): SanitizedHtml => {
    validateHtmlInput(html);

    if (!html.trim()) {
        return { __html: '' };
    }

    return { __html: DOMPurify.sanitize(html) };
};

/**
 * Validates the HTML input parameter
 * @param html - The HTML string to validate
 * @throws Error if validation fails
 */
const validateHtmlInput = (html: string): void => {
    if (html === null || html === undefined) {
        throw new Error(ERROR_MESSAGES.NULL_UNDEFINED);
    }
};
