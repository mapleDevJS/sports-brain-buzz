import pino, { Logger, LoggerOptions } from 'pino';

/**
 * Creates and configures a Pino logger instance with custom formatting
 * @returns Configured Pino logger instance
 */
export const createPinoLogger = (): Logger =>
    pino({
        formatters: {
            level: (label: string): { level: string } => {
                return { level: label.toUpperCase() };
            },
        },
        timestamp: true,
    } as LoggerOptions);
