import React, { lazy, MouseEvent, Suspense, useCallback } from 'react';
import { GlobalStyle, Wrapper } from './App.styles';
import { TOTAL_QUESTIONS } from '../constants/app.constants';
import StartButton from './StartButton';
import NextButton from './NextButton';
import Score from './Score';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { useStartTrivia } from '../_application/startTrivia.ts';
import { useCheckAnswer } from '../_application/checkAnswer.ts';
import { useNextQuestion } from '../_application/nextQuestion.ts';
import { useQuizStorage } from '../_services/storageAdapter.ts';

const QuestionCard = lazy(() => import('./QuestionCard'));

const App: React.FC = () => {
    const { state } = useQuizStorage();

    const { gameOver, userAnswers, loading, questions, currentQuestionNumber, score, error } =
        state;

    const { startTrivia } = useStartTrivia();
    const { checkAnswer } = useCheckAnswer();
    const { nextQuestion } = useNextQuestion();

    const handleStartClick = useCallback(async () => {
        await startTrivia();
    }, [startTrivia]);

    const handleAnswerSelect = useCallback(
        (evt: MouseEvent<HTMLButtonElement>) => {
            checkAnswer(evt);
        },
        [checkAnswer],
    );

    const handleNextQuestionClick = useCallback(() => {
        nextQuestion();
    }, [nextQuestion]);

    const shouldShowStartButton = (): boolean => gameOver || userAnswers.length === TOTAL_QUESTIONS;
    const shouldShowQuestionCard = (): boolean => !loading && !gameOver && questions.length > 0;
    const shouldShowNextButton = (): boolean =>
        !gameOver &&
        !loading &&
        userAnswers.length === currentQuestionNumber + 1 &&
        currentQuestionNumber !== TOTAL_QUESTIONS - 1;

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <h1>SPORTS BRAIN BUZZ</h1>
                {shouldShowStartButton() && <StartButton onClick={handleStartClick} />}
                {!gameOver && <Score score={score} />}

                {loading ? (
                    <Loading />
                ) : (
                    shouldShowQuestionCard() && (
                        <Suspense fallback={<p>Loading...</p>}>
                            <QuestionCard
                                questionNr={currentQuestionNumber + 1}
                                totalQuestions={TOTAL_QUESTIONS}
                                question={questions[currentQuestionNumber].question}
                                answers={questions[currentQuestionNumber].answers}
                                userAnswer={userAnswers[currentQuestionNumber] || undefined}
                                onAnswerSelected={handleAnswerSelect}
                            />
                        </Suspense>
                    )
                )}

                {shouldShowNextButton() && <NextButton onClick={handleNextQuestionClick} />}
                {error && <ErrorMessage message={error} />}
            </Wrapper>
        </>
    );
};

export default App;
