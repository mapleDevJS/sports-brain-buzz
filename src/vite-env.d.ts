/// <reference types="vite/client" />

// Define a type for all possible Vite environment keys for better clarity and future extensibility
type ViteEnvKeys = 'VITE_TOKEN' | 'OTHER_ENV_VARIABLES';

interface ViteEnv {
    // Declare relevant environment variables. Add new keys as needed.
    readonly VITE_TOKEN: string;
    // readonly OTHER_ENV_VARIABLES: string; // Uncomment and define as needed.
}

interface ImportMeta {
    readonly env: ViteEnv;
}
