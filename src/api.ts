import { Difficulty } from './types/difficulty.enum';
import { Question } from './types/question.type';
import { QuestionsState } from './types/question-state.type';
import { shuffleArray } from './helpers/shuffleArray.ts';

// Creating question state by appending shuffled answers
const createQuestionState = (question: Question): QuestionsState => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
});

// Centralized API fetching implementation
const fetchQuestionsFromAPI = async (amount: number, difficulty: Difficulty): Promise<Question[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=21&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
    }

    const data = await response.json();
    return data.results;
};

// Main function to fetch quiz questions and return the processed state
export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
    const questions = await fetchQuestionsFromAPI(amount, difficulty);
    return questions.map(createQuestionState);
};