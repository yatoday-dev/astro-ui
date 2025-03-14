import { buildImports, buildUtilImports } from './buildImports.js';
import buildTypes from './buildTypes.js';

import fs from 'fs';

const folders = {
  'src/components': 'dist/components',
  'src/vendor-config': 'dist/vendor-config',
  'src/utils': 'dist/utils',
};

const files = {
  'src/types.d.ts': 'dist/index.d.ts',
  'README.md': 'dist/README.md',
  LICENSE: 'dist/LICENSE',
  'package.json': 'dist/package.json',
};

console.log('🚀 Preparing package build');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

Object.keys(folders).forEach((key) => {
  fs.cp(key, folders[key], { recursive: true }, (error) => {
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
fs.writeFileSync('dist/astro.d.ts', buildTypes('astro'));
fs.writeFileSync('dist/svelte.d.ts', buildTypes('svelte'));
//fs.writeFileSync('dist/index.d.ts', buildTypes('utils'));

console.log('✅ Package built');
