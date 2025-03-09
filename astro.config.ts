import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import tailwindcss from '@tailwindcss/vite';
import type { AstroIntegration } from 'astro';
import vendor from './src/vendor-config/index';

import svelte from '@astrojs/svelte';

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    icon({
      include: {
        tabler: ['*'],
      },
      iconDir: 'src/assets/icons',
    }),
    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    svelte(),
    vendor({
      config: './src/playground/config.yaml',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
