import React, { memo } from 'react';

type NextButtonProps = {
    onClick: () => void;
};

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => (
    <button className="next" onClick={onClick} type="button" aria-label="Go to next question">
        Next Question
    </button>
);

export default memo(NextButton);
