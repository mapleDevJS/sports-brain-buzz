import React from 'react';

type NextButtonProps = {
    onClick: () => void;
};

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => (
    <button className="next" onClick={onClick}>
        Next Question
    </button>
);

export default NextButton;
