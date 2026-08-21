import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const PORT = env.PORT || 3001;

    return {
        base: '/',
        plugins: [react()],
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            sourcemap: 'hidden',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            assetsInlineLimit: 4096,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vendor': ['react', 'react-dom'],
                        'three': ['three'],
                        'remotion': ['remotion'],
                        'remotion-cli': ['@remotion/cli'],
                        'utils': ['aos', 'lenis']
                    }
                }
            },
            chunkSizeWarningLimit: 1000,
        },
        server: {
            port: 3000,
            open: true,
            proxy: {
                '/api': {
                    target: `http://localhost:${PORT}`,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    };
});