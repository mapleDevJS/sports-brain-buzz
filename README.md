# Sports Brain Buzz ![Vercel Deploy](https://deploy-badge.vercel.app/vercel/sports-brain-buzz?style=for-the-badge)

## Overview

**Sports Brain Buzz** is an interactive sports quiz application that challenges users' knowledge of sports facts and trivia. Built with Next.js, React 19, and TypeScript, this modern web application offers an engaging quiz experience with features like:

- Dynamic question loading and progression
- Real-time answer validation with visual feedback
- Score tracking throughout the quiz
- Comprehensive error handling with error boundaries
- Fully responsive design with mobile support
- Keyboard navigation support (Arrow keys, Enter, Space, 1-4 number keys)
- WCAG 2.1 AA accessibility compliance
- Server-side rendering (SSR) ready

The project leverages modern web development best practices, including Clean Architecture with Domain-Driven Design (DDD), comprehensive testing with Vitest, styled-components for theming, and full type safety with TypeScript.

## Features

### Core Functionality
- ✅ Interactive quiz with multiple-choice questions
- ✅ Real-time scoring and feedback
- ✅ Question progression with visual indicators
- ✅ Session token management for API rate limiting
- ✅ HTML sanitization for secure content rendering

### User Experience
- ✅ Keyboard navigation support
- ✅ Screen reader friendly with ARIA labels
- ✅ Loading states with smooth transitions
- ✅ Error messages with clear feedback
- ✅ Responsive design for all screen sizes

### Technical Features
- ✅ Clean Architecture with DDD principles
- ✅ Error boundaries for graceful error handling
- ✅ SSR-safe localStorage implementation
- ✅ Custom error handling with typed errors
- ✅ Comprehensive test coverage (unit + integration)
- ✅ Type-safe environment variable validation
- ✅ Dependency injection with React Context

## Prerequisites

- **Node.js**: Version 20.15.0 or higher (as specified in `engines`)
- **npm**: Package manager (included with Node.js)

## Getting Started

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/mapleDevJS/sports-brain-buzz.git
    cd sports-brain-buzz
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:

    Create a `.env` file in the root directory:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` by default.

### Testing

Run tests with Vitest:

```bash
npm test              # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:ui       # Open Vitest UI
npm run test:coverage # Generate coverage report
```

### Production Build

Create an optimized production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Maintenance Commands

- **Lint Code**:

    ```bash
    npm run lint        # Check for issues
    npm run lint:fix    # Auto-fix issues
    ```

- **Format Code**:

    ```bash
    npm run format
    ```

- **Type Check**:

    ```bash
    npm run type:check
    ```

- **Clean Build**:
    ```bash
    npm run clean
    ```

## Technical Stack

### Core Dependencies

- **Framework**
    - **next:** ^16.0.0
    - **react:** ^19.0.0
    - **react-dom:** ^19.0.0

- **Styling**
    - **styled-components:** ^6.1.13

- **HTTP & Data Handling**
    - **ky:** ^1.8.1
    - **query-string:** ^9.1.1
    - **url-join:** ^5.0.0

- **Utilities**
    - **dompurify:** ^3.2.5
    - **pino:** ^9.6.0
    - **radash:** ^12.1.0

### Development Dependencies

- **TypeScript & Type Definitions**
    - **typescript:** ^5.4.5
    - **@types/react:** ^19.0.2
    - **@types/react-dom:** ^19.0.2
    - **@types/styled-components:** ^5.1.34
    - **@types/dompurify:** ^3.2.0
    - **@types/node:** ^22.10.2
    - **@types/url-join:** ^4.0.3

- **Testing**
    - **vitest:** ^4.0.15
    - **@testing-library/react:** ^16.3.0
    - **@testing-library/jest-dom:** ^6.9.1
    - **@testing-library/user-event:** ^14.6.1
    - **@vitest/ui:** ^4.0.15
    - **@vitest/coverage-v8:** ^4.0.15
    - **jsdom:** ^27.2.0
    - **happy-dom:** ^20.0.11

- **Code Quality**
    - **eslint:** ^9.17.0
    - **@typescript-eslint/eslint-plugin:** ^8.18.2
    - **@typescript-eslint/parser:** ^8.18.2
    - **eslint-config-next:** ^16.0.0
    - **eslint-config-prettier:** ^9.1.0
    - **eslint-plugin-import:** ^2.29.1
    - **eslint-plugin-jsx-a11y:** ^6.9.0
    - **eslint-plugin-react:** ^7.34.3
    - **eslint-plugin-react-hooks:** ^5.1.0
    - **eslint-plugin-simple-import-sort:** ^12.1.1
    - **prettier:** ^3.3.2

## Project Structure

The application follows Clean Architecture with Domain-Driven Design principles:

```
src/
├── app/                           # Next.js app directory
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page with ErrorBoundary
│   └── providers.tsx              # App-level providers
├── _ui/components/                # Presentation layer
│   ├── App.tsx                    # Main app component
│   ├── QuestionCard.tsx           # Question display with keyboard nav
│   ├── AnswerButton.tsx           # Answer option button
│   ├── ErrorBoundary.tsx          # Error boundary component
│   └── __tests__/                 # Component tests
├── _application/                  # Application layer
│   ├── ports/                     # Interface definitions (DI)
│   └── use-cases/                 # Business logic hooks
├── _domain/                       # Domain layer
│   ├── entities/                  # Domain models
│   └── mappers/                   # Domain transformations
├── _services/                     # Infrastructure layer
│   ├── api/                       # API service implementations
│   ├── di/                        # Dependency injection (Context API)
│   ├── http/                      # HTTP client abstraction
│   ├── logger/                    # Logging service abstraction
│   └── storage/                   # State management (useReducer + Context)
├── _lib/                          # Shared utilities
│   ├── env.ts                     # Environment validation
│   ├── errors.ts                  # Custom error classes
│   ├── validation.ts              # Shared validation logic
│   └── sanitizeHtmlContent.ts     # XSS protection
├── types/                         # TypeScript type definitions
└── constants/                     # Configuration constants
```

## Architecture Highlights

### Clean Architecture
- **Domain Layer**: Pure business logic and entities
- **Application Layer**: Use cases and business rules
- **Infrastructure Layer**: External services and implementations
- **Presentation Layer**: UI components and user interactions

### Key Design Patterns
- **Dependency Injection**: Services injected via React Context
- **Repository Pattern**: Storage adapters for data access
- **Adapter Pattern**: HTTP client and logger abstractions
- **Error Boundary Pattern**: Graceful error handling
- **Custom Hooks**: Reusable business logic

## Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Components, utilities, domain entities
- **Integration Tests**: Use cases, reducers, services
- **Test Setup**: Automated test environment with jsdom
- **Coverage Reporting**: HTML and JSON reports

Example test run:
```bash
npm run test:coverage
```

## Keyboard Navigation

The quiz supports full keyboard navigation:

- **Arrow Keys / Up/Down**: Navigate between answers
- **Enter / Space**: Select current answer
- **Number Keys (1-4)**: Quick select answers
- **Tab**: Navigate between UI elements

## Accessibility

The application meets WCAG 2.1 AA standards:

- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Screen reader support
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast compliance
- ✅ Error announcements

## Security

- ✅ HTML sanitization with DOMPurify
- ✅ Input validation for all user inputs
- ✅ Secure token management
- ✅ XSS protection
- ✅ Environment variable validation
- ✅ Error message sanitization

## Performance

- ✅ Code splitting with Next.js
- ✅ Lazy loading for components
- ✅ Memoization for expensive computations
- ✅ SSR for fast initial load
- ✅ Optimized bundle size
- ✅ Efficient state management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new features
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Quality Standards

- All code must pass TypeScript strict mode
- All tests must pass before merging
- Follow existing code style (enforced by ESLint/Prettier)
- Add tests for new features
- Update documentation for API changes

## License

This project is private and proprietary. All rights reserved.

## Support

For support, bug reports, or feature requests, please:
- Create an issue in the repository
- Contact the project maintainers
- Check existing documentation

---

**Happy Quizzing! 🎯**

Built with ❤️ using Next.js, React 19, TypeScript, and Clean Architecture principles.
