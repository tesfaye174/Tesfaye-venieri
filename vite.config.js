import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const PORT = env.PORT || 3001;

    return {
        base: './',
        plugins: [react()],
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            minify: 'terser',
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

