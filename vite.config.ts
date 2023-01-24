import { defineConfig } from 'vitest/config';
import { ecsstatic } from '@acab/ecsstatic/vite';

export default defineConfig({
  plugins: [ecsstatic()],
  test: {
    include: ['**/*.{test,tests,spec}.{js,mjs,cjs,ts,mts,cts}'],
    environment: 'happy-dom',
    globals: true,
  },
  server: {
    port: 3008,
  },
});
