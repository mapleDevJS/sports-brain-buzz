# Sports Brain Buzz ![Vercel Deploy](https://deploy-badge.vercel.app/vercel/sports-brain-buzz?style=for-the-badge)

## Overview

**Sports Brain Buzz** is an interactive sports quiz application that challenges users' knowledge of sports facts and trivia. Built with React and TypeScript, this modern web application offers an engaging quiz experience with features like:

-   Dynamic question loading and progression
-   Real-time answer validation
-   Score tracking
-   Error handling
-   Responsive design

The project leverages modern web development tools and practices, including Vite for build optimization, styled-components for theming, and comprehensive type safety with TypeScript.

## Prerequisites

-   **Node.js**: Version 20.15.0 or higher (as specified in `engines`)
-   **npm**: Package manager (included with Node.js)

## Getting Started

### Installation

1. **Clone the Repository**:

    ```bash
    git clone <repository-url>
    cd sports-brain-buzz
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

### Development

Start the development server:
`bash
    npm run dev
    `

The application will be available at `http://localhost:3000` by default.

### Production Build

Create an optimized production build:
`bash
    npm run build
    `

Preview the production build:
`bash
    npm run preview
    `

### Maintenance Commands

-   **Lint Code**:

    ```bash
    npm run lint        # Check for issues
    npm run lint:fix    # Auto-fix issues
    ```

-   **Format Code**:

    ```bash
    npm run format
    ```

-   **Clean Build**:
    ```bash
    npm run clean
    ```

## Technical Stack

### Core Dependencies

-   **Framework**

    -   **react:** ^18.3.1
    -   **react-dom:** ^18.3.1

-   **Styling**

    -   **styled-components:** ^5.2.1

-   **HTTP & Data Handling**

    -   **ky:** ^1.8.1
    -   **query-string:** ^9.1.1
    -   **url-join:** ^5.0.0
    -   **http-errors:** ^2.0.0

-   **Utilities**
    -   **dompurify:** ^3.2.5
    -   **pino:** ^9.6.0
    -   **radash:** ^12.1.0

### Development Dependencies

-   **TypeScript & Type Definitions**

    -   **typescript:** ^5.4.5
    -   **@types/react:** ^18.3.3
    -   **@types/react-dom:** ^18.3.0
    -   **@types/styled-components:** ^5.1.34
    -   **@types/http-errors:** ^2.0.4
    -   **@types/url-join:** ^4.0.3

-   **Build Tools**

    -   **vite:** ^6.3.3
    -   **@vitejs/plugin-react:** ^4.4.1
    -   **rimraf:** ^5.0.0

-   **Code Quality**
    -   **eslint:** ^8.57.0
    -   **@typescript-eslint/eslint-plugin:** ^7.13.1
    -   **@typescript-eslint/parser:** ^7.13.1
    -   **eslint-config-prettier:** ^9.1.0
    -   **eslint-plugin-import:** ^2.29.1
    -   **eslint-plugin-jsx-a11y:** ^6.9.0
    -   **eslint-plugin-react:** ^7.34.3
    -   **eslint-plugin-react-hooks:** ^4.6.2
    -   **eslint-plugin-react-refresh:** ^0.4.7
    -   **eslint-plugin-simple-import-sort:** ^12.1.1
    -   **prettier:** ^3.3.2

## Project Structure

The application follows a feature-based structure with core quiz functionality including:

-   Question state management
-   Answer validation
-   Quiz progression control
-   Error handling
-   Score tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For support, bug reports, or feature requests, please contact the project maintainers or create an issue in the repository.

---

Happy Quizzing! 🎯
