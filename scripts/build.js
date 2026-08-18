import { buildImports, buildUtilImports } from './buildImports.js';
import buildTypes from './buildTypes.js';

import fs from 'fs';

const folders = {
  'src/components': 'dist/components',
  'src/vendor-config': 'dist/vendor-config',
  'src/utils': 'dist/utils',
  'src/assets/styles/themes': 'dist/styles/themes',
};

const files = {
  'README.md': 'dist/README.md',
  LICENSE: 'dist/LICENSE',
  'package.json': 'dist/package.json',
};

console.log('🚀 Preparing package build');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

/**
 * Clears the previous build before copying the new one.
 *
 * Copying over the top leaves anything since deleted from `src` sitting in
 * `dist` forever, and `npm run pub` publishes straight out of `dist` — so a
 * component removed from source keeps shipping to every consumer, indefinitely
 * and invisibly. That is not hypothetical: this step was added after finding
 * `CookieConsent/AnalyticsWithConsent.astro` in the publishable output — a file
 * git has never tracked in any branch, so a build picked it up out of the
 * working tree and dist has carried it ever since.
 *
 * Only what this script writes is removed. `dist/node_modules` is deliberately
 * left alone: the build never creates it — it comes from `cd dist && npm link`
 * — and deleting it would silently break the local link workflow. Likewise
 * `dist/styles/styles.css`, which the `build:styles` step regenerates
 * immediately after this one.
 */
const generated = [
  'dist/astro.js',
  'dist/svelte.js',
  'dist/index.js',
  'dist/index.d.ts',
  'dist/astro.d.ts',
  'dist/svelte.d.ts',
];

for (const target of [...Object.values(folders), ...Object.values(files), ...generated]) {
  fs.rmSync(target, { recursive: true, force: true });
}

/**
 * Test suites live next to the code they cover, so a plain recursive copy puts
 * them in the published package — where they are dead weight at best, and at
 * worst reachable from a generated barrel. Nothing under a `__tests__` folder
 * is part of the package's surface, so none of it is copied.
 */
const isTestPath = (source) => source.split(/[\\/]/).includes('__tests__');

Object.keys(folders).forEach((key) => {
  fs.cp(key, folders[key], { recursive: true, filter: (source) => !isTestPath(source) }, (error) => {
    if (error) {
      console.error('Error copying directory', error);
    }
  });
});

Object.keys(files).forEach((key) => {
  fs.copyFile(key, files[key], (error) => {
    if (error) {
      console.error('Error copying file', error);
    }

    // Replace package name, remove dependency, update tests path
    if (key.includes('package.json')) {
      const packageJson = fs.readFileSync(key, 'utf-8');
      const modifiedPackageJson = packageJson.replace(/,\s+"@yatoday\/astro-ui":\s"[0-9.]+"/g, '');

      fs.writeFileSync(files[key], modifiedPackageJson);
    }
  });
});

fs.writeFileSync('dist/astro.js', buildImports('astro'));
fs.writeFileSync('dist/svelte.js', buildImports('svelte'));
fs.writeFileSync('dist/index.js', buildUtilImports());
// Shared types plus the same util barrel index.js exports, so the runtime and
// type surfaces of '@yatoday/astro-ui' can never drift apart.
fs.writeFileSync(
  'dist/index.d.ts',
  `${fs.readFileSync('src/types.d.ts', 'utf-8').trimEnd()}\n\n${buildUtilImports()}\n`
);
fs.writeFileSync('dist/astro.d.ts', buildTypes('astro'));
fs.writeFileSync('dist/svelte.d.ts', buildTypes('svelte'));

console.log('✅ Package built');
