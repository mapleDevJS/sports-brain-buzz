// Helper function to construct API endpoint
import { Difficulty } from '../types/difficulty.enum.ts';
import { API_URL, CATEGORY_ID } from '../constants/api.constants.ts';

export const constructEndpoint = (amount: number, difficulty: Difficulty): string => {
    return `${API_URL}?amount=${amount}&category=${CATEGORY_ID}&difficulty=${difficulty}&type=multiple`;
};
