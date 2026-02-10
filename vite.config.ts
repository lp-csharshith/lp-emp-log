import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  base: '/',                // ✅ Explicit base for Azure

  build: {
    outDir: 'dist',         // ✅ Must match Flask config
    assetsDir: 'assets',
    emptyOutDir: true
  },

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }
});
 