// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default ({ mode }: { mode: string }) => {
  // 1️⃣ carga todas las vars de .env, .env.development o .env.production
  const env = loadEnv(mode, process.cwd(), '');

  // 2️⃣ recupérate inmediatamente tu URL de backend
  const API_URL = env.VITE_API_URL || 'http://localhost:4000';
  console.log('🔗 API_URL =', API_URL);

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(process.cwd(), 'src') },
    },
    server: {
      proxy: {
        // sólo si en tu front llamás a `/api/...`
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
