import React, { lazy, MouseEvent, Suspense, useCallback, useReducer } from 'react';
import { GlobalStyle, Wrapper } from './App.styles';
import {
    INITIAL_QUESTION_NUMBER,
    INITIAL_SCORE,
    TOTAL_QUESTIONS,
} from '../constants/app.constants';
import StartButton from './StartButton';
import NextButton from './NextButton';
import Score from './Score';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { quizReducer } from '../_services/store/quiz-reducer.ts';
import { InitialState } from '../_services/store/initial-state.type.ts';
import { startTrivia } from '../_application/startTrivia.ts';
import { checkAnswer } from '../_application/checkAnswer.ts';
import { nextQuestion } from '../_application/nextQuestion.ts';

const QuestionCard = lazy(() => import('./QuestionCard'));

const initialState: InitialState = {
    loading: false,
    questions: [],
    currentQuestionNumber: INITIAL_QUESTION_NUMBER,
    userAnswers: [],
    score: INITIAL_SCORE,
    gameOver: true,
    error: null,
};

const App: React.FC = () => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const handleStartClick = useCallback(async () => {
        await startTrivia(dispatch);
    }, []);

    const handleAnswerSelect = useCallback(
        (evt: MouseEvent<HTMLButtonElement>) => {
            checkAnswer(evt, dispatch, state);
        },
        [state],
    );

    const handleNextQuestionClick = useCallback(() => {
        nextQuestion(dispatch);
    }, []);

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
                {shouldShowStartButton() && <StartButton onClick={handleStartClick} />}
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
                                onAnswerSelected={handleAnswerSelect}
                            />
                        </Suspense>
                    )
                )}

                {shouldShowNextButton() && <NextButton onClick={handleNextQuestionClick} />}
                {state.error && <ErrorMessage message={state.error} />}
            </Wrapper>
        </>
    );
};

export default App;
