import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.tsx';

const ROOT_ELEMENT_ID = 'root';
const rootElement = document.getElementById(ROOT_ELEMENT_ID);

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
} else {
    console.error(`Element with ID '${ROOT_ELEMENT_ID}' not found.`);
}
