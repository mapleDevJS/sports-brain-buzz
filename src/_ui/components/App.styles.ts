'use client';

import styled, { createGlobalStyle, keyframes } from 'styled-components';

const theme = {
    fontFamily: {
        catamaran: "var(--font-catamaran, 'Catamaran', sans-serif)",
        fascinate: "var(--font-fascinate, 'Fascinate Inline', sans-serif)",
    },
    colors: {
        white: '#ffffff',
        primary: '#00D4FF',
        primaryDark: '#00A8CC',
        secondary: '#FF6B35',
        success: '#10B981',
        error: '#EF4444',
        dark: '#0F172A',
        darkAlpha: 'rgba(15, 23, 42, 0.85)',
        glass: 'rgba(255, 255, 255, 0.1)',
        glassBorder: 'rgba(255, 255, 255, 0.18)',
        textPrimary: '#F8FAFC',
        textSecondary: '#CBD5E1',
        gradient: 'linear-gradient(135deg, #00D4FF 0%, #0EA5E9 100%)',
        gradientWarm: 'linear-gradient(135deg, #FF6B35 0%, #F59E0B 100%)',
        shadow: 'drop-shadow(0 4px 6px rgba(0, 212, 255, 0.3))',
    },
    dimensions: {
        marginNormal: '24px',
        fontSizeH1: '4.5rem',
        fontSizeScore: '2.25rem',
        buttonHeight: '56px',
        buttonPadding: '0 48px',
        maxButtonWidth: '280px',
        borderRadius: '16px',
        borderRadiusSmall: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        boxShadowHover: '0 25px 50px -12px rgba(0, 212, 255, 0.4)',
    },
    breakpoints: {
        mobile: '600px',
        tablet: '900px',
    },
    animations: {
        smooth: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
};

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const shimmer = keyframes`
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
`;

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }
    body {
        background-image: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('/images/nattu-adnan-unsplash.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        animation: ${fadeIn} 0.8s ease-out;
        will-change: transform;
    }
    @media (prefers-reduced-motion: reduce) {
        body {
            animation: none;
        }
    }
    *, *::before, *::after {
        box-sizing: border-box;
        font-family: ${theme.fontFamily.catamaran};
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 900px;
    padding: 40px 20px;

    > p {
        color: ${theme.colors.textSecondary};
        max-width: 800px;
        margin-bottom: ${theme.dimensions.marginNormal};
        line-height: 1.6;
    }

    .score {
        background: ${theme.colors.glass};
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid ${theme.colors.glassBorder};
        border-radius: ${theme.dimensions.borderRadiusSmall};
        padding: 16px 32px;
        margin: 20px 0;
        color: ${theme.colors.white};
        font-size: ${theme.dimensions.fontSizeScore};
        font-weight: 700;
        box-shadow: ${theme.dimensions.boxShadow};
        animation: ${fadeIn} 0.5s ease-out;

        background: linear-gradient(135deg, ${theme.colors.glass} 0%, rgba(255, 255, 255, 0.05) 100%);
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: ${shimmer} 3s infinite;
        }
    }

    h1 {
        font-family: ${theme.fontFamily.fascinate};
        background: ${theme.colors.gradient};
        background-size: 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: ${theme.colors.shadow};
        font-size: ${theme.dimensions.fontSizeH1};
        text-align: center;
        margin: 0 0 ${theme.dimensions.marginNormal} 0;
        letter-spacing: 2px;
        animation: ${float} 3s ease-in-out infinite;
        text-shadow: 0 0 40px rgba(0, 212, 255, 0.5);

        @media (max-width: ${theme.breakpoints.mobile}) {
            font-size: 2.5rem;
        }
    }

    .start,
    .next {
        cursor: pointer;
        background: ${theme.colors.gradient};
        border: none;
        box-shadow: ${theme.dimensions.boxShadow};
        border-radius: ${theme.dimensions.borderRadiusSmall};
        height: ${theme.dimensions.buttonHeight};
        margin: ${theme.dimensions.marginNormal} 0;
        padding: ${theme.dimensions.buttonPadding};
        font-size: 1.125rem;
        font-weight: 700;
        color: ${theme.colors.white};
        letter-spacing: 0.5px;
        transition: all ${theme.animations.smooth};
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left ${theme.animations.smooth};
        }

        &:hover {
            transform: translateY(-3px);
            box-shadow: ${theme.dimensions.boxShadowHover};

            &::before {
                left: 100%;
            }
        }

        &:active {
            transform: translateY(-1px);
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
            width: 100%;
            padding: 0 32px;
        }
    }

    .start {
        max-width: ${theme.dimensions.maxButtonWidth};
        background: ${theme.colors.gradientWarm};
        animation: ${fadeIn} 0.6s ease-out;
    }
`;
