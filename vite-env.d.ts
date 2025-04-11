interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string;
    // Add other environment variables here...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
