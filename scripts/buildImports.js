import fs from 'fs';

export const buildImports = (extension) => {
  const components = fs.readdirSync('src/components');

  // Filter out components that don't have the required extension
  const filteredComponents = components.filter((component) => {
    const componentPath = `src/components/${component}/${component}.${extension}`;
    return fs.existsSync(componentPath);
  });

  return (
    filteredComponents
      .map((component) => {
        return `import ${component}Component from './components/${component}/${component}.${extension}'`;
      })
      .join('\n') +
    '\n\n' +
    filteredComponents.map((component) => `export const ${component} = ${component}Component`).join('\n')
  );
};

export const buildUtilImports = () => {
  // Only real util modules. `readdirSync` also returns directories — `__tests__`
  // among them — and a directory in the barrel makes `import '@yatoday/astro-ui'`
  // resolve to a folder, dragging the test runner's imports into every consumer
  // that touches a util.
  const utils = fs
    .readdirSync('src/utils', { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts'))
    .map((entry) => entry.name);

  return utils.map((util) => `export * from './utils/${util}'`).join('\n');
};
