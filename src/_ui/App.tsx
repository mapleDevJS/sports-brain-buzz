import React, { lazy, Suspense } from 'react';
import { GlobalStyle, Wrapper } from './App.styles';
import { useQuizAppState } from '../_application/useQuizAppState.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants';
import StartButton from './StartButton';
import NextButton from './NextButton';
import Score from './Score';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

const QuestionCard = lazy(() => import('./QuestionCard'));

const App: React.FC = () => {
    const { state, startTrivia, checkAnswer, nextQuestion } = useQuizAppState();

    const shouldShowStartButton = (): boolean =>
        state.gameOver || state.userAnswers.length === TOTAL_QUESTIONS;
    const shouldShowQuestionCard = (): boolean =>
        !state.loading && !state.gameOver && state.questions.length > 0;
    const shouldShowNextButton = (): boolean =>
        !state.gameOver &&
        !state.loading &&
        state.userAnswers.length === state.currentQuestionNumber + 1 &&
        state.currentQuestionNumber !== TOTAL_QUESTIONS - 1;

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <h1>SPORTS BRAIN BUZZ</h1>
                {shouldShowStartButton() && <StartButton onClick={startTrivia} />}
                {!state.gameOver && <Score score={state.score} />}

                {state.loading ? (
                    <Loading />
                ) : (
                    shouldShowQuestionCard() && (
                        <Suspense fallback={<p>Loading...</p>}>
                            <QuestionCard
                                questionNr={state.currentQuestionNumber + 1}
                                totalQuestions={TOTAL_QUESTIONS}
                                question={state.questions[state.currentQuestionNumber].question}
                                answers={state.questions[state.currentQuestionNumber].answers}
                                userAnswer={
                                    state.userAnswers[state.currentQuestionNumber] || undefined
                                }
                                onAnswerSelected={checkAnswer}
                            />
                        </Suspense>
                    )
                )}

                {shouldShowNextButton() && <NextButton onClick={nextQuestion} />}
                {state.error && <ErrorMessage message={state.error} />}
            </Wrapper>
        </>
    );
};

export default App;
