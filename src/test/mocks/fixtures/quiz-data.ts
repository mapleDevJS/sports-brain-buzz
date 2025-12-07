import { QuestionRdo, TokenRdo } from '../../../_application/ports/ports.ts';
import { QuestionEntity } from '../../../_domain/entities/question.entity.ts';
import { ResponseCode } from '../../../types/response-code.enum.ts';

/**
 * Mock session token data
 */
export const mockTokenData: TokenRdo = {
    response_code: ResponseCode.Success,
    response_message: 'Token Generated Successfully!',
    token: 'mock-session-token-123456',
};

/**
 * Mock questions for testing
 */
export const mockQuestions: QuestionEntity[] = [
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which team won the 2018 FIFA World Cup?',
        correct_answer: 'France',
        incorrect_answers: ['Germany', 'Brazil', 'Argentina'],
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'In which sport would you perform a &quot;slam dunk&quot;?',
        correct_answer: 'Basketball',
        incorrect_answers: ['Volleyball', 'Tennis', 'Baseball'],
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'What is the maximum number of players on a soccer field for one team?',
        correct_answer: '11',
        incorrect_answers: ['9', '10', '12'],
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which country hosted the 2016 Summer Olympics?',
        correct_answer: 'Brazil',
        incorrect_answers: ['China', 'United Kingdom', 'Russia'],
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'In American football, how many points is a touchdown worth?',
        correct_answer: '6',
        incorrect_answers: ['7', '5', '8'],
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'What is the term for three strikes in a row in bowling?',
        correct_answer: 'Turkey',
        incorrect_answers: ['Eagle', 'Hat Trick', 'Triple'],
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which tennis player has won the most Grand Slam titles as of 2023?',
        correct_answer: 'Novak Djokovic',
        incorrect_answers: ['Rafael Nadal', 'Roger Federer', 'Pete Sampras'],
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'What is the national sport of Canada?',
        correct_answer: 'Lacrosse',
        incorrect_answers: ['Ice Hockey', 'Basketball', 'Baseball'],
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'In which year did Usain Bolt set the 100m world record?',
        correct_answer: '2009',
        incorrect_answers: ['2008', '2012', '2016'],
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question: 'How many players are on a rugby union team?',
        correct_answer: '15',
        incorrect_answers: ['13', '11', '17'],
    },
];

/**
 * Mock question data response
 */
export const mockQuestionData: QuestionRdo = {
    response_code: ResponseCode.Success,
    results: mockQuestions,
};

/**
 * Mock HTTP response for token
 */
export const mockTokenResponse: HttpResponse<TokenRdo> = {
    status: 200,
    data: mockTokenData,
};

/**
 * Mock HTTP response for questions
 */
export const mockQuestionResponse: HttpResponse<QuestionRdo> = {
    status: 200,
    data: mockQuestionData,
};

/**
 * Mock error responses
 */
export const mockRateLimitResponse: QuestionRdo = {
    response_code: ResponseCode.RateLimit,
    results: [],
};

export const mockNoResultsResponse: QuestionRdo = {
    response_code: ResponseCode.NoResults,
    results: [],
};

export const mockInvalidParameterResponse: QuestionRdo = {
    response_code: ResponseCode.InvalidParameter,
    results: [],
};
