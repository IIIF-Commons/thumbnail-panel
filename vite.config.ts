import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.{test,tests,spec}.{js,mjs,cjs,ts,mts,cts}'],
    environment: 'happy-dom',
    globals: true,
  },
  server: {
    port: 3008,
  },
});
