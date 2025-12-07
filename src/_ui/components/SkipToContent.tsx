'use client';

import React from 'react';
import styled from 'styled-components';

const SkipLink = styled.a`
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #00d4ff 0%, #0095ff 100%);
    color: #0f1419;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    z-index: 10000;
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
    transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    &:focus {
        top: 1rem;
        outline: 3px solid #fff;
        outline-offset: 3px;
    }
`;

export const SkipToContent: React.FC = () => {
    return (
        <SkipLink href="#main-content" tabIndex={0}>
            Skip to main content
        </SkipLink>
    );
};
