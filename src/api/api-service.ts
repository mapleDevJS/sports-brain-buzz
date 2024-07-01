import { constructEndpoint } from '../helpers/constructEndpoint.ts';
import { handleFetchError } from '../helpers/errorHandler.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { Question } from '../types/question.type.ts';
import { QuestionRdo } from './question.rdo.ts';

// Function to fetch questions from the API
const fetchQuestionsFromAPI = async (
    amount: number,
    difficulty: Difficulty,
): Promise<Question[]> => {
    const endpoint = constructEndpoint(amount, difficulty);
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Failed to fetch quiz questions: ${response.statusText}`);
        }
        const data: QuestionRdo = await response.json();
        if (!data.results || !Array.isArray(data.results)) {
            throw new Error('Invalid data format received from API');
        }
        return data.results;
    } catch (error) {
        handleFetchError(error, 'fetchQuestionsFromAPI');
        throw new Error('Unable to complete request for quiz questions.');
    }
};

// Abstract API service in functional style
const apiService = {
    fetchQuestionsFromAPI,
};

export default apiService;
