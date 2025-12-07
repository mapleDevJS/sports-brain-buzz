class EnvValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvValidationError';
    }
}

const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new EnvValidationError(`Missing required environment variable: ${key}`);
    }
    return value;
};

export const env = {
    supabaseUrl: getEnv('VITE_SUPABASE_URL'),
    supabaseAnonKey: getEnv('VITE_SUPABASE_ANON_KEY'),
} as const;

export const validateEnv = (): void => {
    try {
        getEnv('VITE_SUPABASE_URL');
        getEnv('VITE_SUPABASE_ANON_KEY');
    } catch (error) {
        if (error instanceof EnvValidationError) {
            throw error;
        }
        throw new Error('Environment validation failed');
    }
};
