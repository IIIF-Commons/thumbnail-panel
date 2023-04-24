import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'ThumbnailComponent',
      fileName: 'thumbnail-component',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react()],
  test: {
    include: ['**/*.{test,tests,spec}.{js,mjs,cjs,ts,tsx,mts,cts}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
  server: {
    port: 3008,
  },
});
