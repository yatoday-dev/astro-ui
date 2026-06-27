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
  outDir: 'dist-doc',
  // Astro 7 enforces a remote-image allowlist by default (SSRF hardening).
  // The documentation demos pull sample images from swiperjs.com.
  image: {
    domains: ['swiperjs.com'],
  },
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
      // CSS minification is handled by Astro/Vite (esbuild). astro-compress runs
      // `csso` as a second pass, and csso 5.0.5 silently DROPS modern media-query
      // range syntax (e.g. Tailwind 4.3.x `@media (width>=48rem)`), wiping every
      // responsive `md:`/`lg:` rule. Leave CSS to the (correct) Vite pass.
      CSS: false,
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
