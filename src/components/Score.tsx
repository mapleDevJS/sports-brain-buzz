import React from 'react';

type ScoreProps = {
    score: number;
};

const Score: React.FC<ScoreProps> = ({ score }) => <p className="score">Score: {score}</p>;

export default Score;
