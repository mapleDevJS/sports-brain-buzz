import { MouseEvent } from 'react';
import { QuizStorageService } from './ports.ts';

type Dependencies = {
    quizStorage: QuizStorageService;
};

export const checkAnswer = (evt: MouseEvent<HTMLButtonElement>, dependencies: Dependencies) => {
    const { quizStorage } = dependencies;
    const { state, checkAnswer: checkAnswerStorage } = quizStorage;

    if (state.gameOver) return;

    const answer = evt.currentTarget.value;

    const currentQuestion = state.questions[state.currentQuestionNumber];

    checkAnswerStorage(answer, currentQuestion.correct_answer, currentQuestion.question);
};
