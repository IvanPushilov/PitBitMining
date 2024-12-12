import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/filestorage' : {
        target : 'http://localhost:4000',
        changeOrigin: true,
      },
      '/profileImg' : {
        target : 'http://localhost:4000',
        changeOrigin: true,
      },
      '/postsMedia' : {
        target : 'http://localhost:4000',
        changeOrigin: true,
      }
    },
    },
  }
);
