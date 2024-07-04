export const localStore = () => ({
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
});
