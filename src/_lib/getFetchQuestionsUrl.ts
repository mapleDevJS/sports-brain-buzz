import { API_URL, CATEGORY_ID } from '../constants/api.constants.ts';
import { Difficulty } from '../types/difficulty.enum.ts';

export const getFetchQuestionsUrl = (
    amount: number,
    difficulty: Difficulty,
    token: string,
): string => {
    return `${API_URL}/api.php?amount=${amount}&category=${CATEGORY_ID}&difficulty=${difficulty}&type=multiple&token=${token}`;
};
