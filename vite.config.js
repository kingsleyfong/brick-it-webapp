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
    'import.meta.env.VITE_HF_API_URL': '"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"',
    'import.meta.env.VITE_ENABLE_DIRECT_API': 'true',
    'import.meta.env.VITE_ENABLE_CORS_PROXY': 'true',
    'import.meta.env.VITE_INFERENCE_STEPS_FAST': '20',
    'import.meta.env.VITE_INFERENCE_STEPS_HIGH': '30',
    'import.meta.env.VITE_GUIDANCE_SCALE': '7.5',
  }
}) 