import { Question } from '../types/question.type.ts';
import { Difficulty } from '../types/difficulty.enum.ts';

export interface ApiServiceInterface {
    fetchQuestionsFromAPI: (amount: number, difficulty: Difficulty) => Promise<Question[]>;
}
