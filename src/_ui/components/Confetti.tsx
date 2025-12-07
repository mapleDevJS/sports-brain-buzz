'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fall = keyframes`
    0% {
        transform: translateY(-100vh) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
`;

const ConfettiPiece = styled.div<{
    $left: number;
    $delay: number;
    $duration: number;
    $color: string;
}>`
    position: fixed;
    top: -10px;
    left: ${(props) => props.$left}%;
    width: 10px;
    height: 10px;
    background: ${(props) => props.$color};
    animation: ${fall} ${(props) => props.$duration}s linear ${(props) => props.$delay}s forwards;
    z-index: 10000;
    pointer-events: none;
`;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10000;
`;

const colors = ['#00d4ff', '#ff6b35', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export const Confetti: React.FC = () => {
    const [pieces, setPieces] = useState<
        Array<{ id: number; left: number; delay: number; duration: number; color: string }>
    >([]);

    useEffect(() => {
        const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));

        setPieces(confettiPieces);

        const timeout = setTimeout(() => {
            setPieces([]);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    if (pieces.length === 0) return null;

    return (
        <Container aria-hidden="true">
            {pieces.map((piece) => (
                <ConfettiPiece
                    key={piece.id}
                    $left={piece.left}
                    $delay={piece.delay}
                    $duration={piece.duration}
                    $color={piece.color}
                />
            ))}
        </Container>
    );
};
