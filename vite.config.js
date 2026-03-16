import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        classic: resolve(__dirname, 'classic/index.html'),
        modern: resolve(__dirname, 'modern/index.html')
      }
    }
  }
});
