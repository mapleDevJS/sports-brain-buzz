import React, { useState } from 'react';
// types
import { Difficulty, fetchQuizQuestions, QuestionsState } from '../api.ts';
// Components
import QuestionCard from './QuestionCard.tsx';
// Styles
import { GlobalStyle, Wrapper } from './App.styles.ts';

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;
const INITIAL_SCORE = 0;
const INITIAL_QUESTION_NUMBER = 0;

const createAnswerObject = (
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string,
): AnswerObject => ({
    question,
    answer,
    correct,
    correctAnswer,
});

const App: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionsState[]>([]);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(INITIAL_QUESTION_NUMBER);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(INITIAL_SCORE);
    const [gameOver, setGameOver] = useState(true);

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

        setQuestions(newQuestions);
        setScore(INITIAL_SCORE);
        setUserAnswers([]);
        setCurrentQuestionNumber(INITIAL_QUESTION_NUMBER);
        setLoading(false);
    };

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = e.currentTarget.value;
            const correct = questions[currentQuestionNumber].correct_answer === answer;

            if (correct) setScore((prevScore) => prevScore + 1);

            const answerObject = createAnswerObject(
                questions[currentQuestionNumber].question,
                answer,
                correct,
                questions[currentQuestionNumber].correct_answer,
            );

            setUserAnswers((prevAnswers) => [...prevAnswers, answerObject]);
        }
    };

    const nextQuestion = () => {
        const nextQuestionNumber = currentQuestionNumber + 1;
        if (nextQuestionNumber === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setCurrentQuestionNumber(nextQuestionNumber);
        }
    };

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <h1>REACT QUIZ</h1>
                {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                    <button className="start" onClick={startTrivia}>
                        Start
                    </button>
                ) : null}
                {!gameOver && <p className="score">Score: {score}</p>}
                {loading && <p>Loading Questions...</p>}
                {!loading && !gameOver && (
                    <QuestionCard
                        questionNr={currentQuestionNumber + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[currentQuestionNumber].question}
                        answers={questions[currentQuestionNumber].answers}
                        userAnswer={userAnswers ? userAnswers[currentQuestionNumber] : undefined}
                        callback={checkAnswer}
                    />
                )}
                {!gameOver &&
                    !loading &&
                    userAnswers.length === currentQuestionNumber + 1 &&
                    currentQuestionNumber !== TOTAL_QUESTIONS - 1 && (
                        <button className="next" onClick={nextQuestion}>
                            Next Question
                        </button>
                    )}
            </Wrapper>
        </>
    );
};

export default App;
