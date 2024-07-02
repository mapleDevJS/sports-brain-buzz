import styled from 'styled-components';

// Defining some CSS variables for reuse and easier theming
const colors = {
    primary: '#0085a3',
    secondary: '#ebfeff',
    correct: ['#56FFA4', '#59BC86'],
    incorrect: ['#FF5656', '#C16868'],
    default: ['#56CCFF', '#6EAFB4'],
    textLight: '#ffffff',
    boxShadow: 'rgba(0, 0, 0, 0.25)',
};

export const Wrapper = styled.div`
    max-width: 1100px;
    background: ${colors.secondary};
    border-radius: 12px;
    border: 2px solid ${colors.primary};
    padding: 20px;
    box-shadow: 0 5px 15px ${colors.boxShadow};
    text-align: center;

    p {
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        max-width: 90%;
        padding: 15px;
    }

    @media (max-width: 480px) {
        max-width: 100%;
        padding: 10px;
    }
`;

type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.85;
    }

    button {
        cursor: pointer;
        user-select: none;
        font-size: 0.85rem;
        width: 100%;
        height: 45px;
        margin: 5px 0;
        background: ${({ correct, userClicked }) =>
            correct
                ? `linear-gradient(90deg, ${colors.correct.join(', ')})`
                : userClicked
                  ? `linear-gradient(90deg, ${colors.incorrect.join(', ')})`
                  : `linear-gradient(90deg, ${colors.default.join(', ')})`};
        border: 3px solid ${colors.textLight};
        box-shadow: 2px 3px 0 ${colors.boxShadow};
        border-radius: 12px;
        color: ${colors.textLight};
        text-shadow: 0 1px 1px ${colors.boxShadow};

        &:active {
            transform: scale(0.98);
            box-shadow: 1px 2px 0 ${colors.boxShadow};
        }

        @media (max-width: 480px) {
            font-size: 0.75rem;
            height: 40px;
        }
    }
`;
