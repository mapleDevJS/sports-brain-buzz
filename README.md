# React Quiz Project ![Vercel Deploy](https://deploy-badge.vercel.app/vercel/react-quiz-teal?style=for-the-badge)

## Overview

The **react-quiz** project is a web application designed to offer a seamless quiz experience. Built with the latest version of React and TypeScript, the project leverages modern web development tools such as Vite for build and development, styled-components for styling, and ESLint and Prettier for code quality and formatting.

## Prerequisites

- **Node.js**: Ensure you have Node.js version 20.15.0 installed, as specified in the `engines` field.
- **npm**: npm is used as the package manager. It comes bundled with Node.js.

## Getting Started

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd react-quiz
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server with hot reloading, run:
```bash
npm run dev
```
The application will be available at `http://localhost:3000` (or another port if specified).

### Building the Project

To create an optimized production build, run:
```bash
npm run build
```
The output will be in the `dist` directory. You can preview the production build using:
```bash
npm run preview
```

### Linting and Formatting

- **Lint Code**: To check for linting errors, run:
  ```bash
  npm run lint
  ```

- **Fix Linting Errors**: To auto-fix linting issues, run:
  ```bash
  npm run lint:fix
  ```

- **Format Code**: To format the code using Prettier, run:
  ```bash
  npm run format
  ```

### Cleaning the Build Directory

To clean the build directory, run:
```bash
npm run clean
```

## Technologies Used

### Dependencies
- **react:** ^18.3.1
- **react-dom:** ^18.3.1
- **styled-components:** ^5.2.1

### DevDependencies
- **@types/react:** ^18.3.3
- **@types/react-dom:** ^18.3.0
- **@types/styled-components:** ^5.1.34
- **@typescript-eslint/eslint-plugin:** ^7.13.1
- **@typescript-eslint/parser:** ^7.13.1
- **@vitejs/plugin-react:** ^4.3.1
- **eslint:** ^8.57.0
- **eslint-config-prettier:** ^9.1.0
- **eslint-plugin-import:** ^2.29.1
- **eslint-plugin-jsx-a11y:** ^6.9.0
- **eslint-plugin-react:** ^7.34.3
- **eslint-plugin-react-hooks:** ^4.6.2
- **eslint-plugin-react-refresh:** ^0.4.7
- **prettier:** ^3.3.2
- **typescript:** ^5.4.5
- **vite:** ^5.3.1

## Contribution

Feel free to fork this repository and make your changes. Please create a pull request to the main branch and provide a detailed description of your changes.

## License

This project is private and not currently open for public contributions.

## Contact

For any queries or issues, please contact the project maintainer.

---

Happy coding! 🚀

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

1. Configure the top-level `parserOptions` property like this:
    ```js
    export default {
        // other rules...
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            project: ['./tsconfig.json', './tsconfig.node.json'],
            tsconfigRootDir: __dirname,
        },
    };
    ```

2. Replace `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`.

3. Optionally, add `plugin:@typescript-eslint/stylistic-type-checked`.

4. Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` and `plugin:react/jsx-runtime` to the `extends` list.