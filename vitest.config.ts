/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      // Virtual module supplied by the Astro build, which vitest does not run.
      'astro:assets': path.resolve(__dirname, './src/utils/__tests__/__stubs__/astro-assets.ts'),
    },
  },
});
