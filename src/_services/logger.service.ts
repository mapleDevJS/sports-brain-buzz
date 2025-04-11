import { LoggerService } from '../_application/ports.ts';

const isDevelopment = import.meta.env.MODE === 'development';

export const loggerService: LoggerService = {
    log(...args: unknown[]): void {
        if (isDevelopment) console.log(...args);
    },
    info(...args: unknown[]): void {
        if (isDevelopment) console.info(...args);
    },
    warn(...args: unknown[]): void {
        if (isDevelopment) console.warn(...args);
    },
    error(...args: unknown[]): void {
        if (isDevelopment) console.error(...args);
    },
};
