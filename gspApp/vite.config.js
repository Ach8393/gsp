import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        format: 'es', // Ensure the output format is ES modules
      },
    },
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript', // Ensure correct MIME type for local dev server
    },
  },
  esbuild: {
    target: 'esnext', // Ensure modern JavaScript features
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Create an alias for cleaner imports
    },
  },
});
