import { QuizStorageService } from './ports.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
};

export const getNextQuestion = ({ quizStorage }: Dependencies) => {
    const { nextQuestion } = quizStorage;

    nextQuestion();
};
