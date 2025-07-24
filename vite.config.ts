// vite.config.ts
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default ({ mode }: ConfigEnv) => {
  // 1️⃣ Carga todas las variables de env de la carpeta raíz:
  //    - .env
  //    - .env.development
  //    - .env.production
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // 2️⃣ Inyecta el objeto env completo bajo process.env
    define: {
      'process.env': env,
    },
    server: {
      proxy: {
        // 3️⃣ Durante `npm run dev`, cualquier `/api/...` irá a tu BACKEND real
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
