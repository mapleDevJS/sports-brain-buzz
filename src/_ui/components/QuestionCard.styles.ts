import styled, { keyframes } from 'styled-components';

const colors = {
    primary: '#00D4FF',
    glass: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.18)',
    correct: '#10B981',
    correctGlow: 'rgba(16, 185, 129, 0.3)',
    incorrect: '#EF4444',
    incorrectGlow: 'rgba(239, 68, 68, 0.3)',
    default: 'rgba(255, 255, 255, 0.08)',
    defaultBorder: 'rgba(255, 255, 255, 0.15)',
    textLight: '#ffffff',
    textSecondary: '#CBD5E1',
    boxShadow: 'rgba(0, 0, 0, 0.3)',
};

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
`;

export const Wrapper = styled.div`
    max-width: 800px;
    width: 100%;
    background: ${colors.glass};
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid ${colors.glassBorder};
    padding: 32px;
    box-shadow: 0 20px 25px -5px ${colors.boxShadow}, 0 10px 10px -5px ${colors.boxShadow};
    text-align: center;
    animation: ${slideIn} 0.5s ease-out;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, ${colors.primary}, transparent);
        animation: ${pulse} 2s ease-in-out infinite;
    }

    p {
        font-size: 1.125rem;
        line-height: 1.8;
        color: ${colors.textLight};
        margin: 16px 0;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        max-width: 95%;
        padding: 24px;
    }

    @media (max-width: 480px) {
        max-width: 100%;
        padding: 20px;
        border-radius: 16px;
    }
`;

type ButtonWrapperProps = {
    $correct: boolean;
    $userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateX(4px);
    }

    button {
        cursor: pointer;
        user-select: none;
        font-size: 1rem;
        font-weight: 600;
        width: 100%;
        min-height: 56px;
        margin: 10px 0;
        padding: 16px 20px;
        background: ${({ $correct, $userClicked }) =>
            $correct
                ? `linear-gradient(135deg, ${colors.correct}, #059669)`
                : $userClicked
                  ? `linear-gradient(135deg, ${colors.incorrect}, #DC2626)`
                  : colors.default};
        border: 1px solid ${({ $correct, $userClicked }) =>
            $correct ? colors.correct : $userClicked ? colors.incorrect : colors.defaultBorder};
        box-shadow: ${({ $correct, $userClicked }) =>
            $correct
                ? `0 8px 16px ${colors.correctGlow}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                : $userClicked
                  ? `0 8px 16px ${colors.incorrectGlow}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                  : `0 4px 6px ${colors.boxShadow}`};
        border-radius: 12px;
        color: ${colors.textLight};
        text-align: left;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        &:hover::before {
            opacity: 1;
        }

        &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${({ $correct, $userClicked }) =>
                $correct
                    ? `0 12px 24px ${colors.correctGlow}`
                    : $userClicked
                      ? `0 12px 24px ${colors.incorrectGlow}`
                      : `0 8px 16px rgba(0, 212, 255, 0.3)`};
            border-color: ${({ $correct, $userClicked }) =>
                $correct ? colors.correct : $userClicked ? colors.incorrect : colors.primary};
        }

        &:active:not(:disabled) {
            transform: translateY(0);
        }

        &:disabled {
            cursor: not-allowed;
        }

        @media (max-width: 480px) {
            font-size: 0.9rem;
            min-height: 48px;
            padding: 12px 16px;
        }
    }
`;
