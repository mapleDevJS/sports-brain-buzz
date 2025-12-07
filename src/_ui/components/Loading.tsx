import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px;
`;

const Spinner = styled.div`
    width: 48px;
    height: 48px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: #00d4ff;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
    color: #cbd5e1;
    font-size: 1.125rem;
    font-weight: 500;
    animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LOADING_TEXT = 'Loading Questions...';

const LoadingMessage: React.FC = () => (
    <LoadingContainer>
        <Spinner />
        <LoadingText>{LOADING_TEXT}</LoadingText>
    </LoadingContainer>
);

export default LoadingMessage;
