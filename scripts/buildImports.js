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
  const utils = fs.readdirSync('src/utils');

  return utils.map((util) => `export * from './utils/${util}'`).join('\n');
};
