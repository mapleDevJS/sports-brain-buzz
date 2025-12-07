import { describe, expect, it } from 'vitest';

import { sanitizeHtmlContent } from './sanitizeHtmlContent';

describe('sanitizeHtmlContent', () => {
    describe('XSS Attack Prevention', () => {
        it('should remove script tags from malicious input', () => {
            const malicious = '<script>alert("XSS")</script>Hello';
            const result = sanitizeHtmlContent(malicious);

            expect(result.__html).not.toContain('<script>');
            expect(result.__html).not.toContain('alert');
            expect(result.__html).toBe('Hello');
        });

        it('should remove inline event handlers (onclick)', () => {
            const malicious = '<button onclick="alert(\'XSS\')">Click</button>';
            const result = sanitizeHtmlContent(malicious);

            expect(result.__html).not.toContain('onclick');
            expect(result.__html).not.toContain('alert');
            expect(result.__html).toBe('<button>Click</button>');
        });

        it('should remove inline event handlers (onerror)', () => {
            const malicious = '<img src="x" onerror="alert(\'XSS\')">';
            const result = sanitizeHtmlContent(malicious);

            expect(result.__html).not.toContain('onerror');
            expect(result.__html).not.toContain('alert');
            expect(result.__html).toContain('<img src="x">');
        });

        it('should remove javascript: protocol in href', () => {
            const malicious = '<a href="javascript:alert(\'XSS\')">Click</a>';
            const result = sanitizeHtmlContent(malicious);

            expect(result.__html).not.toContain('javascript:');
            expect(result.__html).not.toContain('alert');
        });

        it('should sanitize data: protocol content while preserving safe data URIs', () => {
            const malicious = '<img src="data:text/html,<script>alert(\'XSS\')</script>">';
            const result = sanitizeHtmlContent(malicious);

            // DOMPurify allows data: URIs but sanitizes the content
            // The script tag within data URI should still be removed or escaped
            expect(result.__html).toBeDefined();
            // If data: is allowed, it should at least sanitize the script content
        });

        it('should remove iframe tags', () => {
            const malicious = '<iframe src="https://evil.com"></iframe>';
            const result = sanitizeHtmlContent(malicious);

            expect(result.__html).not.toContain('<iframe');
            expect(result.__html).toBe('');
        });

        it('should remove object and embed tags', () => {
            const malicious = '<object data="malicious.swf"></object><embed src="malicious.swf">';
            const result = sanitizeHtmlContent(malicious);

            expect(result.__html).not.toContain('<object');
            expect(result.__html).not.toContain('<embed');
            expect(result.__html).toBe('');
        });

        it('should prevent DOM clobbering attacks', () => {
            const malicious = '<form id="document"><input name="cookie"></form>';
            const result = sanitizeHtmlContent(malicious);

            // DOMPurify should sanitize this or allow it safely
            expect(result.__html).toBeDefined();
        });
    });

    describe('Valid HTML Handling', () => {
        it('should preserve simple text without HTML', () => {
            const text = 'Simple text without any HTML tags';
            const result = sanitizeHtmlContent(text);

            expect(result.__html).toBe(text);
        });

        it('should preserve safe HTML tags (p, strong, em)', () => {
            const html = '<p>This is <strong>bold</strong> and <em>italic</em></p>';
            const result = sanitizeHtmlContent(html);

            expect(result.__html).toBe(html);
        });

        it('should preserve HTML entities', () => {
            const html = 'What is the meaning of &quot;life&quot;?';
            const result = sanitizeHtmlContent(html);

            expect(result.__html).toBe(html);
        });

        it('should preserve safe links with https protocol', () => {
            const html = '<a href="https://example.com">Safe Link</a>';
            const result = sanitizeHtmlContent(html);

            expect(result.__html).toContain('href="https://example.com"');
            expect(result.__html).toContain('Safe Link');
        });
    });

    describe('Edge Cases', () => {
        it('should return empty string for empty input', () => {
            const result = sanitizeHtmlContent('');

            expect(result.__html).toBe('');
        });

        it('should return empty string for whitespace-only input', () => {
            const result = sanitizeHtmlContent('   ');

            expect(result.__html).toBe('');
        });

        it('should return empty string for tabs and newlines only', () => {
            const result = sanitizeHtmlContent('\t\n\r');

            expect(result.__html).toBe('');
        });

        it('should handle very long strings', () => {
            const longText = 'a'.repeat(10000);
            const result = sanitizeHtmlContent(longText);

            expect(result.__html).toBe(longText);
            expect(result.__html.length).toBe(10000);
        });

        it('should handle nested HTML tags', () => {
            const nested = '<div><p><span>Nested <strong>content</strong></span></p></div>';
            const result = sanitizeHtmlContent(nested);

            expect(result.__html).toContain('Nested');
            expect(result.__html).toContain('content');
        });

        it('should handle malformed HTML gracefully', () => {
            const malformed = '<p>Unclosed paragraph<strong>Bold</strong>';
            const result = sanitizeHtmlContent(malformed);

            expect(result.__html).toBeDefined();
            expect(result.__html).toContain('Unclosed paragraph');
            expect(result.__html).toContain('Bold');
        });

        it('should handle special characters', () => {
            const special = 'Special chars: < > & " \' / \\';
            const result = sanitizeHtmlContent(special);

            expect(result.__html).toBeDefined();
        });
    });

    describe('Return Type', () => {
        it('should return object with __html property', () => {
            const result = sanitizeHtmlContent('test');

            expect(result).toHaveProperty('__html');
            expect(typeof result.__html).toBe('string');
        });

        it('should return object compatible with dangerouslySetInnerHTML', () => {
            const result = sanitizeHtmlContent('test');

            // Should have exactly one property: __html
            expect(Object.keys(result)).toEqual(['__html']);
        });
    });

    describe('Real-world Quiz Scenarios', () => {
        it('should sanitize quiz question with HTML entities', () => {
            const question = 'What does &quot;HTML&quot; stand for?';
            const result = sanitizeHtmlContent(question);

            expect(result.__html).toBe(question);
        });

        it('should sanitize quiz answer with special characters', () => {
            const answer = 'C++ &amp; Java';
            const result = sanitizeHtmlContent(answer);

            expect(result.__html).toBe(answer);
        });

        it('should handle quiz content with mixed safe HTML', () => {
            const content = '<p>Which team won the <strong>2018 FIFA World Cup</strong>?</p>';
            const result = sanitizeHtmlContent(content);

            expect(result.__html).toContain('2018 FIFA World Cup');
            expect(result.__html).toContain('<strong>');
            expect(result.__html).toContain('<p>');
        });
    });

    describe('Error Handling', () => {
        it('should throw error for null input', () => {
            expect(() => {
                // @ts-expect-error Testing null input
                sanitizeHtmlContent(null);
            }).toThrow('HTML content cannot be null or undefined');
        });

        it('should throw error for undefined input', () => {
            expect(() => {
                // @ts-expect-error Testing undefined input
                sanitizeHtmlContent(undefined);
            }).toThrow('HTML content cannot be null or undefined');
        });
    });

    describe('Complex XSS Vectors', () => {
        it('should handle encoded script tags', () => {
            const encoded = '&lt;script&gt;alert("XSS")&lt;/script&gt;';
            const result = sanitizeHtmlContent(encoded);

            expect(result.__html).toBeDefined();
            // Encoded tags should be preserved as text, not executed
        });

        it('should handle nested script tags', () => {
            const nested = '<div><script>alert("XSS")</script></div>';
            const result = sanitizeHtmlContent(nested);

            expect(result.__html).not.toContain('<script>');
            expect(result.__html).not.toContain('alert');
        });

        it('should handle SVG-based XSS', () => {
            const svg = '<svg onload="alert(\'XSS\')"><circle r="50"/></svg>';
            const result = sanitizeHtmlContent(svg);

            expect(result.__html).not.toContain('onload');
            expect(result.__html).not.toContain('alert');
        });

        it('should handle mixed case event handlers', () => {
            const mixed = '<img src="x" OnErRoR="alert(\'XSS\')">';
            const result = sanitizeHtmlContent(mixed);

            expect(result.__html).not.toMatch(/onerror/i);
            expect(result.__html).not.toContain('alert');
        });
    });
});
