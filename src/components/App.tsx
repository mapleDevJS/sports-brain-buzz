import React, { lazy, Suspense } from 'react';
import { GlobalStyle, Wrapper } from './App.styles.ts';
import { useQuizAppState } from '../hooks/useQuizAppState.ts';
import { TOTAL_QUESTIONS } from '../constants/app.constants.ts';
const QuestionCard = lazy(() => import('./QuestionCard.tsx'));

const App: React.FC = () => {
    const { state, startTrivia, checkAnswer, nextQuestion } = useQuizAppState();

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <h1>SPORTS BRAIN BUZZ</h1>
                {(state.gameOver || state.userAnswers.length === TOTAL_QUESTIONS) && (
                    <button className="start" onClick={startTrivia}>
                        Start
                    </button>
                )}
                {!state.gameOver && <p className="score">Score: {state.score}</p>}
                {state.loading ? (
                    <p>Loading Questions...</p>
                ) : (
                    !state.loading &&
                    !state.gameOver &&
                    state.questions.length > 0 && (
                        <Suspense fallback={<p>Loading...</p>}>
                            <QuestionCard
                                questionNr={state.currentQuestionNumber + 1}
                                totalQuestions={TOTAL_QUESTIONS}
                                question={state.questions[state.currentQuestionNumber].question}
                                answers={state.questions[state.currentQuestionNumber].answers}
                                userAnswer={
                                    state.userAnswers
                                        ? state.userAnswers[state.currentQuestionNumber]
                                        : undefined
                                }
                                onAnswerSelected={checkAnswer}
                            />
                        </Suspense>
                    )
                )}
                {!state.gameOver &&
                    !state.loading &&
                    state.userAnswers.length === state.currentQuestionNumber + 1 &&
                    state.currentQuestionNumber !== TOTAL_QUESTIONS - 1 && (
                        <button className="next" onClick={nextQuestion}>
                            Next Question
                        </button>
                    )}
                {state.error && <p className="error">{state.error}</p>}
            </Wrapper>
        </>
    );
};

export default App;
