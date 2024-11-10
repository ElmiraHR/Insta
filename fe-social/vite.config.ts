import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Адрес вашего API-сервера
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Убедитесь, что URL корректно переписывается
        secure: false,
      },
    },
  },
});
