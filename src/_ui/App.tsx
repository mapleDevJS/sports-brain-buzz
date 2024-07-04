import React, { lazy, MouseEvent, Suspense, useCallback } from 'react';

import { useQuizStorage } from '../_services/store/storageAdapter.ts';
import { useCheckAnswer } from '../_services/useCheckAnswer.ts';
import { useNextQuestion } from '../_services/useNextQuestion.ts';
import { useStartTrivia } from '../_services/useStartTrivia.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants';
import { GlobalStyle, Wrapper } from './App.styles';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import NextButton from './NextButton';
import Score from './Score';
import StartButton from './StartButton';

const MemoizedQuestionCard = lazy(() => import('./QuestionCard'));

const App: React.FC = () => {
    const { state } = useQuizStorage();

    const { gameOver, userAnswers, loading, questions, currentQuestionNumber, score, error } =
        state;

    const startTrivia = useStartTrivia();
    const checkAnswer = useCheckAnswer();
    const nextQuestion = useNextQuestion();

    const handleStartClick = useCallback(async () => {
        await startTrivia();
    }, [startTrivia]);

    const handleAnswerSelect = useCallback(
        (evt: MouseEvent<HTMLButtonElement>) => {
            checkAnswer(evt.currentTarget.value);
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
                            <MemoizedQuestionCard
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
