import styled, { createGlobalStyle, keyframes } from 'styled-components';

import BGImage from '../images/nattu-adnan-unsplash.jpg';

// Define constants and theme colors together
const theme = {
    fontFamily: {
        catamaran: "'Catamaran', sans-serif",
        fascinate: "'Fascinate Inline', sans-serif",
    },
    colors: {
        white: '#fff',
        gradient: 'linear-gradient(180deg, #fff, #87f1ff)',
        shadow: 'drop-shadow(2px 2px #0085a3)',
        border: '#d38558',
        buttonGradient: 'linear-gradient(180deg, #ffffff, #ffcc91)',
    },
    dimensions: {
        marginNormal: '20px',
        fontSizeH1: '70px',
        fontSizeScore: '2rem',
        buttonHeight: '40px',
        buttonPadding: '0 40px',
        maxButtonWidth: '200px',
        borderRadius: '10px',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.25)',
    },
    breakpoints: {
        mobile: '600px',
    },
    animations: {
        buttonHover: '0.3s ease-in-out',
    },
};

// Keyframes for animations
const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

// Global styles
export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }
    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: ${fadeIn} 1s ease-in-out;
    }
    *, *::before, *::after {
        box-sizing: border-box;
        font-family: ${theme.fontFamily.catamaran};
    }
`;

// Wrapper component styles
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    > p {
        color: ${theme.colors.white};
        max-width: 800px;
        margin-bottom: ${theme.dimensions.marginNormal};
    }

    .score {
        color: ${theme.colors.white};
        font-size: ${theme.dimensions.fontSizeScore};
        margin: 0;
    }

    h1 {
        font-family: ${theme.fontFamily.fascinate};
        background-image: ${theme.colors.gradient};
        background-size: 100%;
        background-clip: text;
        filter: ${theme.colors.shadow};
        font-size: ${theme.dimensions.fontSizeH1};
        text-align: center;
        margin: ${theme.dimensions.marginNormal};
    }

    .start,
    .next {
        cursor: pointer;
        background: ${theme.colors.buttonGradient};
        border: 2px solid ${theme.colors.border};
        box-shadow: ${theme.dimensions.boxShadow};
        border-radius: ${theme.dimensions.borderRadius};
        height: ${theme.dimensions.buttonHeight};
        margin: ${theme.dimensions.marginNormal} 0;
        padding: ${theme.dimensions.buttonPadding};
        transition: transform ${theme.animations.buttonHover};

        &:hover {
            transform: scale(1.05);
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
            width: 100%;
        }
    }

    .start {
        max-width: ${theme.dimensions.maxButtonWidth};
    }
`;
