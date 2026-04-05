import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws',
    },
    host: 'localhost',
    port: 5173,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:3000',
      },
    },
  },
});
