import { http, HttpResponse } from 'msw';

import { API_URL } from '../../constants/api.constants.ts';
import { mockQuestionData, mockTokenData } from './fixtures/quiz-data.ts';

/**
 * MSW Request Handlers for the Trivia Quiz API
 * These handlers intercept and mock API calls during tests
 */
export const handlers = [
    /**
     * Mock endpoint for fetching a session token
     * GET https://opentdb.com/api_token.php?command=request
     */
    http.get(`${API_URL}/api_token.php`, ({ request }) => {
        const url = new URL(request.url);
        const command = url.searchParams.get('command');

        // Handle token request
        if (command === 'request') {
            return HttpResponse.json(mockTokenData, { status: 200 });
        }

        // Handle token reset
        if (command === 'reset') {
            const token = url.searchParams.get('token');
            if (!token) {
                return HttpResponse.json(
                    {
                        response_code: 2,
                        response_message: 'Token parameter is required',
                    },
                    { status: 400 },
                );
            }

            return HttpResponse.json(
                {
                    response_code: 0,
                    token: token,
                },
                { status: 200 },
            );
        }

        // Invalid command
        return HttpResponse.json(
            {
                response_code: 2,
                response_message: 'Invalid command',
            },
            { status: 400 },
        );
    }),

    /**
     * Mock endpoint for fetching quiz questions
     * GET https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple&token=...
     */
    http.get(`${API_URL}/api.php`, ({ request }) => {
        const url = new URL(request.url);
        const amount = url.searchParams.get('amount');
        const category = url.searchParams.get('category');
        const difficulty = url.searchParams.get('difficulty');
        const type = url.searchParams.get('type');
        const token = url.searchParams.get('token');

        // Validate required parameters
        if (!amount || !category || !difficulty || !type || !token) {
            return HttpResponse.json(
                {
                    response_code: 2,
                    results: [],
                },
                { status: 400 },
            );
        }

        // Validate amount
        const amountNum = parseInt(amount, 10);
        if (isNaN(amountNum) || amountNum < 1 || amountNum > 50) {
            return HttpResponse.json(
                {
                    response_code: 2,
                    results: [],
                },
                { status: 400 },
            );
        }

        // Return mock questions (limited to requested amount)
        const results = mockQuestionData.results.slice(0, amountNum);
        return HttpResponse.json(
            {
                response_code: 0,
                results,
            },
            { status: 200 },
        );
    }),
];
