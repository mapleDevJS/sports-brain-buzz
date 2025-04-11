/**
 * Validates that the given input is a valid HTML string.
 * Throws a TypeError with context if the validation fails.
 * @param input - The input to validate.
 * @throws {TypeError} If the input is not a string.
 */
export const validateHtmlInput = (input: unknown): void => {
    if (typeof input !== 'string') {
        throw new TypeError(`Validation Error: Expected a string, but received ${typeof input}.`);
    }

    // Optional: Check for non-empty strings if that is a requirement
    if (input.trim() === '') {
        throw new TypeError(
            'Validation Error: Provided input is an empty or whitespace-only string.',
        );
    }
};
