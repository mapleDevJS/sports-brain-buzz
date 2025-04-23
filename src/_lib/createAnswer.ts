import { Answer } from '../_domain/answer.type';

const ERROR_MESSAGE = {
    EMPTY_FIELDS: 'Question, answer and expected answer must not be empty',
} as const;

/**
 * Validates the answer fields
 * @throws {Error} if any required field is empty or contains only whitespace
 */
const validateAnswerFields = (answer: Answer): void => {
    const { userQuestion, userAnswer, expectedAnswer } = answer;
    const isEmptyOrWhitespace = (str: string): boolean => !str?.trim();

    if (
        isEmptyOrWhitespace(userQuestion) ||
        isEmptyOrWhitespace(userAnswer) ||
        isEmptyOrWhitespace(expectedAnswer)
    ) {
        throw new Error(ERROR_MESSAGE.EMPTY_FIELDS);
    }
};

/**
 * Creates a validated Answer object
 * @param answerData The answer data to validate and create
 * @returns A validated Answer object
 * @throws {Error} if validation fails
 */
export const createAnswer = (answerData: Answer): Answer => {
    validateAnswerFields(answerData);

    return {
        userQuestion: answerData.userQuestion,
        userAnswer: answerData.userAnswer,
        isCorrect: answerData.isCorrect,
        expectedAnswer: answerData.expectedAnswer,
    };
};
