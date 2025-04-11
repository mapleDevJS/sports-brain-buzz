import DOMPurify, { Config } from 'dompurify';

import { validateHtmlInput } from './validateHtmlInput.ts';

const DEFAULT_SANITIZATION = true;

/**
 * Generates a sanitized or raw markup object for `dangerouslySetInnerHTML` in React.
 * @param html - The raw HTML string to process.
 * @param options - Configuration object to control sanitization.
 * @param options.sanitize - Whether to sanitize the input HTML (default: true).
 * @param options.purifyOptions - Optional configuration for `DOMPurify.sanitize`.
 * @returns An object containing the processed HTML.
 * @throws TypeError if the input `html` is not a string.
 */
export const generateSanitizedMarkup = (
    html: string,
    options?: { sanitize?: boolean; purifyOptions?: Config },
): { __html: string } => {
    // Validate input
    validateHtmlInput(html);

    // Destructure options with defaults
    const { sanitize = DEFAULT_SANITIZATION, purifyOptions } = options || {};

    // Process HTML with or without sanitization
    const processedHtml = sanitize ? DOMPurify.sanitize(html, purifyOptions) : html;

    // Return in proper React-compatible format
    return { __html: processedHtml };
};
