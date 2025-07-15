// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path  from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(process.cwd(), 'src') },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',  // <- ¡mismo puerto donde tu Express escucha!
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
