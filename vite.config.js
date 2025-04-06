import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    outDir: 'dist',
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'EMPTY_BUNDLE') return;
        warn(warning);
      }
    }
  },
  server: {
    port: 3000,
  },
  define: {
    'import.meta.env.VITE_HUGGINGFACE_API_TOKEN': '""',
  }
}) 