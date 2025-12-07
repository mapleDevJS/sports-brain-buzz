import { Logger } from '../../_application/ports/ports';

export const createConsoleLogger = (): Logger => ({
    debug: (obj: unknown, msg?: string) => {
        if (msg) {
            console.debug(msg, obj);
        } else {
            console.debug(obj);
        }
    },
    info: (obj: unknown, msg?: string) => {
        if (msg) {
            console.info(msg, obj);
        } else {
            console.info(obj);
        }
    },
    warn: (obj: unknown, msg?: string) => {
        if (msg) {
            console.warn(msg, obj);
        } else {
            console.warn(obj);
        }
    },
    error: (obj: unknown, msg?: string) => {
        if (msg) {
            console.error(msg, obj);
        } else {
            console.error(obj);
        }
    },
    fatal: (obj: unknown, msg?: string) => {
        if (msg) {
            console.error('[FATAL]', msg, obj);
        } else {
            console.error('[FATAL]', obj);
        }
    },
});
