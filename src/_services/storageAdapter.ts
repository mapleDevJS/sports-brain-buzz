import { StorageService } from '../_application/ports.ts';

export const storageService: StorageService = {
    getItem: (key: string) => {
        return sessionStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
        sessionStorage.setItem(key, value);
    },
    removeItem: (key: string) => {
        sessionStorage.removeItem(key);
    },
    clear: () => {
        sessionStorage.clear();
    },
    key: (index: number) => {
        return sessionStorage.key(index);
    },
    get length() {
        return sessionStorage.length;
    },
};
