import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const ErrorContainer = styled.div`
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    padding: 20px 24px;
    margin: 20px 0;
    max-width: 600px;
    animation: ${slideIn} 0.4s ease-out;
    box-shadow: 0 8px 16px rgba(239, 68, 68, 0.2);
`;

const ErrorText = styled.p`
    color: #fecaca;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.5;

    &::before {
        content: '⚠️ ';
        margin-right: 8px;
    }
`;

type ErrorMessageProps = {
    message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <ErrorContainer role="alert" aria-live="polite">
        <ErrorText>{message}</ErrorText>
    </ErrorContainer>
);

export default ErrorMessage;
