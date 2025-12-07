'use client';

import React from 'react';
import styled from 'styled-components';

type Props = {
    onClick: () => void;
    disabled?: boolean;
};

const Button = styled.button<{ disabled?: boolean }>`
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    background: ${(props) =>
        props.disabled
            ? 'rgba(255, 255, 255, 0.1)'
            : 'linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(255, 107, 53, 0.1) 100%)'};
    backdrop-filter: blur(20px);
    border: 2px solid
        ${(props) =>
            props.disabled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 107, 53, 0.3)'};
    border-radius: 16px;
    box-shadow: ${(props) =>
        props.disabled
            ? 'none'
            : '0 8px 24px rgba(255, 107, 53, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'};
    color: ${(props) => (props.disabled ? '#64748b' : '#ff6b35')};
    height: 48px;
    padding: 0 2rem;
    font-family: 'Catamaran', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(255, 107, 53, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 107, 53, 0.5);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:focus-visible {
        outline: 3px solid rgba(255, 107, 53, 0.5);
        outline-offset: 3px;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const UndoButton: React.FC<Props> = ({ onClick, disabled = false }) => {
    return (
        <Button onClick={onClick} disabled={disabled} aria-label="Undo last answer">
            ← Undo Last Answer
        </Button>
    );
};

export default UndoButton;
