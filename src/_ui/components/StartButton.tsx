import React from 'react';

type StartButtonProps = {
    onClick: () => void;
};

const BUTTON_TEXT = 'Start';

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => (
    <button className="start" onClick={onClick}>
        {BUTTON_TEXT}
    </button>
);

export default StartButton;
