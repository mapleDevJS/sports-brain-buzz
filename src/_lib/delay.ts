export const delay = (milliseconds: number, resultValue: number = 2): Promise<number> => {
    // Validate the delay time (in milliseconds) to ensure it's non-negative
    if (milliseconds < 0) {
        return Promise.reject(new Error('Delay time (in milliseconds) must be non-negative.'));
    }

    return new Promise((resolve) => {
        setTimeout(() => resolve(resultValue), milliseconds);
    });
};
