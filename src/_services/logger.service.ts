import pino from 'pino';

import { LoggerService } from '../_application/ports.ts';

export const createLoggerService = (logger: pino.Logger): LoggerService => ({
    debug(message: string, ...args: unknown[]): void {
        logger.debug({ args }, message);
    },
    info(message: string, ...args: unknown[]): void {
        logger.info({ args }, message);
    },
    warn(message: string, ...args: unknown[]): void {
        logger.warn({ args }, message);
    },
    error(message: string, error?: unknown, ...args: unknown[]): void {
        logger.error(
            {
                error:
                    error instanceof Error
                        ? {
                              message: error.message,
                              stack: error.stack,
                          }
                        : error,
                args,
            },
            message,
        );
    },
});

export const createDefaultLogger = () =>
    pino({
        formatters: {
            level: (label) => {
                return { level: label.toUpperCase() };
            },
        },
        timestamp: true,
    });
