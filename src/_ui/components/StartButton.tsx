import React, { memo } from 'react';

type StartButtonProps = {
    onClick: () => void;
};

const BUTTON_TEXT = 'Start';

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => (
    <button className="start" onClick={onClick} type="button" aria-label="Start the sports quiz">
        {BUTTON_TEXT}
    </button>
);

export default memo(StartButton);
