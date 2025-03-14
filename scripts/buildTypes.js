import fs from 'fs';

const getTypeName = (component, framework) => {
  const componentsWithoutFrameworkSpecificTypes = [
    'Accordion',
    'Avatar',
    'BottomNavigation',
    'Breadcrumb',
    'Icon',
    'Rating',
    'Skeleton',
    'Spinner',
    'Stepper',
    'Table',
    'Progress',
  ];

  return componentsWithoutFrameworkSpecificTypes.includes(component)
    ? `${component}Props`
    : `${framework}${component}Props`;
};

const format = (template) => template.trim().replace(new RegExp('^[ \\t]{12}', 'gm'), '');

const buildTypes = (type) => {
  const components = fs.readdirSync('src/components');

  if (type === 'astro') {
    return format(`
    ${components
      .map((component) => {
        return `import type { ${component}Props as Yt${component}Props } from './components/${component}/types'`;
      })
      .join('\n')}

declare module '@yatoday/astro-ui/${type}' {
  ${components
    .map((component) => {
      return `export function ${component}(_props: Yt${component}Props): any`;
    })
    .join('\n\t')}

  ${components
    .map((component) => {
      return `export type ${component}Props = Yt${component}Props`;
    })
    .join('\n\t')}
}
`);
  }

  if (type === 'svelte') {
    return format(`
import type { Component } from 'svelte'
${components
  .map((component) => {
    return `import type { ${getTypeName(component, 'Svelte')} as Yt${getTypeName(component, 'Svelte')} } from './components/${component}/types'`;
  })
  .join('\n')}

declare module '@yatoday/astro-ui/${type}' {
  ${components
    .map((component) => {
      return `export const ${component}: Component<Yt${getTypeName(component, 'Svelte')}>`;
    })
    .join('\n\t')}

  ${components
    .map((component) => {
      return `export type ${component}Props = Yt${getTypeName(component, 'Svelte')}`;
    })
    .join('\n\t')}
}`);
  }
};

export default buildTypes;
