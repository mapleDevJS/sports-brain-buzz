import { QuizStorageService } from './ports.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
};

export const nextQuestion = (dependencies: Dependencies) => {
    const { quizStorage } = dependencies;
    const { nextQuestion: nextQuestion2 } = quizStorage;

    nextQuestion2();
};
