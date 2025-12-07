import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath } from 'url';
import { defineConfig, type PluginOption } from 'vite';
import compression from 'vite-plugin-compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // Gzip compression
        compression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 10240, // Only compress files larger than 10kb
            deleteOriginFile: false,
        }),
        // Brotli compression
        compression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 10240,
            deleteOriginFile: false,
        }),
        // Bundle size visualization
        visualizer({
            filename: 'dist/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
        }) as PluginOption,
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@domain': resolve(__dirname, './src/_domain'),
            '@application': resolve(__dirname, './src/_application'),
            '@services': resolve(__dirname, './src/_services'),
            '@ui': resolve(__dirname, './src/_ui'),
            '@lib': resolve(__dirname, './src/_lib'),
            '@types': resolve(__dirname, './src/types'),
            '@constants': resolve(__dirname, './src/constants'),
        },
    },
    build: {
        sourcemap: false,
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                // Manual chunk splitting for better caching
                manualChunks: {
                    // Vendor chunks
                    'react-vendor': ['react', 'react-dom'],
                    'ui-vendor': ['styled-components'],
                    'utils-vendor': ['dompurify', 'radash', 'query-string'],
                },
            },
        },
        // Minification
        minify: 'esbuild',
        target: 'es2020',
    },
    server: {
        port: 5173,
        strictPort: false,
        open: false,
        cors: true,
    },
    preview: {
        port: 4173,
        strictPort: false,
        open: false,
    },
});
