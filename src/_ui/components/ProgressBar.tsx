'use client';

import React from 'react';
import styled from 'styled-components';

type Props = {
    current: number;
    total: number;
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto 2rem;
    animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const ProgressContainer = styled.div`
    position: relative;
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ProgressFill = styled.div<{ $percentage: number }>`
    height: 100%;
    width: ${(props) => props.$percentage}%;
    background: linear-gradient(90deg, #00d4ff 0%, #0095ff 50%, #00d4ff 100%);
    background-size: 200% 100%;
    border-radius: 12px;
    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    animation: shimmer 2s linear infinite;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 212, 255, 0.3);
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
        );
        animation: sweep 2s ease-in-out infinite;
    }

    @keyframes shimmer {
        0% {
            background-position: 0% 0%;
        }
        100% {
            background-position: 200% 0%;
        }
    }

    @keyframes sweep {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
`;

const ProgressText = styled.p`
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #cbd5e1;
    letter-spacing: 0.5px;
    font-weight: 500;
`;

export const ProgressBar: React.FC<Props> = ({ current, total }) => {
    const percentage = Math.round((current / total) * 100);

    return (
        <Wrapper role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
            <ProgressContainer>
                <ProgressFill $percentage={percentage} />
            </ProgressContainer>
            <ProgressText>
                Question {current} of {total} ({percentage}% Complete)
            </ProgressText>
        </Wrapper>
    );
};
