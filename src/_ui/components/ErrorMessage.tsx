import React from 'react';

type ErrorMessageProps = {
    message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <p className="error">{message}</p>
);

export default ErrorMessage;
