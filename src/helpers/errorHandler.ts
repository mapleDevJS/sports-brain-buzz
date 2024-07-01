// Helper function for centralized error handling
export const handleFetchError = (error: unknown, context: string): void => {
    if (error instanceof Error) {
        console.error(`Error in ${context}:`, error.message);
    } else {
        console.error(`Unexpected error in ${context}:`, error);
    }
};
