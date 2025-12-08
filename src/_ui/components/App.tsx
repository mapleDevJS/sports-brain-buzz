'use client';

import React, { lazy, MouseEvent, Suspense, useCallback, useMemo } from 'react';

import { useCheckAnswer } from '../../_application/use-cases/useCheckAnswer';
import { useNextQuestion } from '../../_application/use-cases/useNextQuestion';
import { useStartTrivia } from '../../_application/use-cases/useStartTrivia';
import { useUndoAnswer } from '../../_application/use-cases/useUndoAnswer';
import { useQuizStorage } from '../../_services/storage/storageAdapters';
import { TOTAL_QUESTIONS } from '../../constants/app.constants';
import { GlobalStyle, Wrapper } from './App.styles';
import { Confetti } from './Confetti';
import ErrorMessage from './ErrorMessage';
import { FocusTrap } from './FocusTrap';
import Loading from './Loading';
import NextButton from './NextButton';
import { ProgressBar } from './ProgressBar';
import { ReviewScreen } from './ReviewScreen';
import Score from './Score';
import { SkipToContent } from './SkipToContent';
import StartButton from './StartButton';
import UndoButton from './UndoButton';

const MemoizedQuestionCard = lazy(() => import('./QuestionCard'));

const App: React.FC = () => {
    const { state } = useQuizStorage();
    const {
        gameOver,
        userAnswers,
        loading,
        questions,
        currentQuestionNumber,
        score,
        error,
        showReview,
    } = state;

    const startTrivia = useStartTrivia();
    const checkAnswer = useCheckAnswer();
    const nextQuestion = useNextQuestion();
    const undoAnswer = useUndoAnswer();

    // Handle the click event to start the trivia game
    const handleStartClick = useCallback(async () => {
        await startTrivia();
    }, [startTrivia]);

    // Handle the selection of an answer
    const handleAnswerSelect = useCallback(
        (evt: MouseEvent<HTMLButtonElement>) => {
            checkAnswer(evt.currentTarget.value);
        },
        [checkAnswer],
    );

    // Handle the click event to go to the next question
    const handleNextQuestionClick = useCallback(() => {
        nextQuestion();
    }, [nextQuestion]);

    // Determine whether to show the Start button
    const shouldShowStartButton = useMemo(
        () => (gameOver && !showReview) || (gameOver && error !== null),
        [gameOver, showReview, error],
    );

    // Determine whether to show the QuestionCard component
    const shouldShowQuestionCard = useMemo(
        () => !loading && !gameOver && questions.length > 0,
        [loading, gameOver, questions.length],
    );

    // Determine whether to show the Next button
    const shouldShowNextButton = useMemo(
        () =>
            !gameOver &&
            !loading &&
            userAnswers.length === currentQuestionNumber + 1 &&
            currentQuestionNumber !== TOTAL_QUESTIONS - 1,
        [gameOver, loading, userAnswers.length, currentQuestionNumber],
    );

    // Determine whether to show the Undo button
    const shouldShowUndoButton = useMemo(
        () =>
            !gameOver &&
            !loading &&
            userAnswers.length > 0 &&
            userAnswers.length === currentQuestionNumber + 1,
        [gameOver, loading, userAnswers.length, currentQuestionNumber],
    );

    // Check if perfect score
    const isPerfectScore = useMemo(
        () => gameOver && score === TOTAL_QUESTIONS,
        [gameOver, score],
    );

    // Handle undo
    const handleUndo = useCallback(() => {
        undoAnswer();
    }, [undoAnswer]);

    return (
        <>
            <GlobalStyle />
            <SkipToContent />

            {/* Show confetti for perfect score */}
            {isPerfectScore && <Confetti />}

            <Wrapper id="main-content" tabIndex={-1}>
                <h1>SPORTS BRAIN BUZZ</h1>

                {/* Display an error message at the top if there is any */}
                {error && <ErrorMessage message={error} />}

                {/* Show review screen after quiz completion */}
                {showReview && !loading ? (
                    <ReviewScreen
                        userAnswers={userAnswers}
                        score={score}
                        totalQuestions={TOTAL_QUESTIONS}
                        onRestart={handleStartClick}
                    />
                ) : (
                    <>
                        {/* Conditional rendering for the Start button */}
                        {shouldShowStartButton && <StartButton onClick={handleStartClick} />}

                        {/* Display progress bar and score if the game is not over */}
                        {!gameOver && questions.length > 0 && (
                            <>
                                <ProgressBar
                                    current={currentQuestionNumber + 1}
                                    total={TOTAL_QUESTIONS}
                                />
                                <Score score={score} />
                            </>
                        )}

                        {/* Display loading spinner or the QuestionCard component */}
                        <FocusTrap isActive={loading}>
                            {loading ? (
                                <Loading />
                            ) : (
                                shouldShowQuestionCard && (
                                    <Suspense fallback={<Loading />}>
                                        <MemoizedQuestionCard
                                            questionNr={currentQuestionNumber + 1}
                                            totalQuestions={TOTAL_QUESTIONS}
                                            question={questions[currentQuestionNumber].question}
                                            answers={questions[currentQuestionNumber].answers}
                                            userAnswer={
                                                userAnswers[currentQuestionNumber] || undefined
                                            }
                                            onAnswerSelected={handleAnswerSelect}
                                        />
                                    </Suspense>
                                )
                            )}
                        </FocusTrap>

                        {/* Conditional rendering for the Undo and Next buttons */}
                        {(shouldShowUndoButton || shouldShowNextButton) && (
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    width: '100%',
                                    marginTop: '1rem',
                                }}
                            >
                                {shouldShowUndoButton && (
                                    <UndoButton onClick={handleUndo} disabled={false} />
                                )}
                                {shouldShowNextButton && (
                                    <NextButton onClick={handleNextQuestionClick} />
                                )}
                            </div>
                        )}
                    </>
                )}
            </Wrapper>
        </>
    );
};

export default App;
