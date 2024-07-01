import { Difficulty } from '../types/difficulty.enum';
import { Question } from '../types/question.type';
import { QuestionsState } from '../store/question-state.type.ts';
import { shuffleArray } from '../helpers/shuffleArray';
import { handleFetchError } from '../helpers/errorHandler';
import { ApiServiceInterface } from './api-service.interface.ts';

// Create question state by appending shuffled answers
const createQuestionState = (question: Question): QuestionsState => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
});

// Main function to fetch quiz questions and return the processed state with improved error handling
const fetchQuizQuestions = async (
    amount: number,
    difficulty: Difficulty,
    apiService: ApiServiceInterface,
): Promise<QuestionsState[]> => {
    try {
        const questions = await apiService.fetchQuestionsFromAPI(amount, difficulty);
        return questions.map(createQuestionState);
    } catch (error) {
        handleFetchError(error, 'fetchQuizQuestions');
        throw new Error('Failed to fetch quiz questions and process state.');
    }
};

const quizService = {
    fetchQuizQuestions,
};

export default quizService;
