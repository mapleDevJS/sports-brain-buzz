import { Dispatch, MouseEvent } from 'react';
import { ActionTypes } from '../_services/store/action-types.enum.ts';
import { ActionType } from '../_services/store/action-type.type.ts';
import { InitialState } from '../_services/store/initial-state.type.ts';

export const checkAnswer = (
    evt: MouseEvent<HTMLButtonElement>,
    dispatch: Dispatch<ActionType>,
    state: InitialState,
) => {
    if (state.gameOver) return;

    const answer = evt.currentTarget.value;

    const currentQuestion = state.questions[state.currentQuestionNumber];

    dispatch({
        type: ActionTypes.CHECK_ANSWER,
        payload: {
            answer,
            correctAnswer: currentQuestion.correct_answer,
            question: currentQuestion.question,
        },
    });
};
