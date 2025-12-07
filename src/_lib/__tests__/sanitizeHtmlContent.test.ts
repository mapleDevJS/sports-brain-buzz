import { describe, expect, it } from 'vitest';

import { sanitizeHtmlContent } from '../sanitizeHtmlContent';

describe('sanitizeHtmlContent', () => {
    it('sanitizes HTML content', () => {
        const input = '<script>alert("xss")</script><p>Safe content</p>';
        const result = sanitizeHtmlContent(input);
        expect(result.__html).not.toContain('<script>');
        expect(result.__html).toContain('Safe content');
    });

    it('allows safe HTML tags', () => {
        const input = '<strong>Bold</strong> <em>Italic</em>';
        const result = sanitizeHtmlContent(input);
        expect(result.__html).toContain('<strong>');
        expect(result.__html).toContain('<em>');
    });

    it('removes dangerous attributes', () => {
        const input = '<img src="x" onerror="alert(1)">';
        const result = sanitizeHtmlContent(input);
        expect(result.__html).not.toContain('onerror');
    });

    it('handles empty string', () => {
        const result = sanitizeHtmlContent('');
        expect(result.__html).toBe('');
    });

    it('handles HTML entities', () => {
        const input = '&lt;script&gt;alert("test")&lt;/script&gt;';
        const result = sanitizeHtmlContent(input);
        expect(result.__html).toBe('&lt;script&gt;alert("test")&lt;/script&gt;');
    });
});
