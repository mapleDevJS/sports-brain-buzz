import React, { lazy, MouseEvent, Suspense, useCallback, useMemo } from 'react';

import { useCheckAnswer } from '../../_application/use-cases/useCheckAnswer.ts';
import { useNextQuestion } from '../../_application/use-cases/useNextQuestion.ts';
import { useStartTrivia } from '../../_application/use-cases/useStartTrivia.ts';
import { useQuizStorage } from '../../_services/storage/storageAdapters.ts';
import { TOTAL_QUESTIONS } from '../../constants/app.constants.ts';
import { GlobalStyle, Wrapper } from './App.styles.ts';
import ErrorMessage from './ErrorMessage.tsx';
import Loading from './Loading.tsx';
import NextButton from './NextButton.tsx';
import Score from './Score.tsx';
import StartButton from './StartButton.tsx';

const MemoizedQuestionCard = lazy(() => import('./QuestionCard.tsx'));

const App: React.FC = () => {
    const { state } = useQuizStorage();
    const { gameOver, userAnswers, loading, questions, currentQuestionNumber, score, error } =
        state;

    const startTrivia = useStartTrivia();
    const checkAnswer = useCheckAnswer();
    const nextQuestion = useNextQuestion();

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
        () => gameOver || userAnswers.length === TOTAL_QUESTIONS,
        [gameOver, userAnswers.length],
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

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <h1>SPORTS BRAIN BUZZ</h1>

                {/* Display an error message at the top if there is any */}
                {error && <ErrorMessage message={error} />}

                {/* Conditional rendering for the Start button */}
                {shouldShowStartButton && <StartButton onClick={handleStartClick} />}

                {/* Display the score if the game is not over */}
                {!gameOver && <Score score={score} />}

                {/* Display loading spinner or the QuestionCard component */}
                {loading ? (
                    <Loading />
                ) : (
                    shouldShowQuestionCard && (
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

                {/* Conditional rendering for the Next button */}
                {shouldShowNextButton && <NextButton onClick={handleNextQuestionClick} />}
            </Wrapper>
        </>
    );
};

export default App;
