import { LocalStorageService } from '../../../_application/ports/ports';

const isBrowser = typeof window !== 'undefined';

const createNoopStorage = (): LocalStorageService => ({
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
});

export const localStore = (): LocalStorageService => {
    if (!isBrowser) {
        return createNoopStorage();
    }

    return {
        getItem: (key: TokenKey) => {
            return localStorage.getItem(key);
        },
        setItem: (key: TokenKey, value: string) => {
            localStorage.setItem(key, value);
        },
        removeItem: (key: TokenKey) => {
            localStorage.removeItem(key);
        },
        clear: () => {
            localStorage.clear();
        },
        key: (index: number) => {
            return localStorage.key(index);
        },
        get length() {
            return localStorage.length;
        },
    };
};
