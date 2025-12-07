import React from 'react';

type ErrorMessageProps = {
    message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <p className="error" role="alert" aria-live="polite">
        {message}
    </p>
);

export default ErrorMessage;
