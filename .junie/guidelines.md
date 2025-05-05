# Development Guidelines for @yatoday/astro-ui

This document provides essential information for developers working on the @yatoday/astro-ui component library.

## Build/Configuration Instructions

### Prerequisites

- Node.js (version specified in package.json)
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yatoday-dev/astro-ui.git
   cd astro-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the Astro development server, which provides hot module reloading for rapid development.

### Building

There are several build scripts available:

- **Build for documentation**:
  ```bash
  npm run build:doc
  ```
  This builds the documentation site to the `dist-doc` directory.

- **Build the component library**:
  ```bash
  npm run build:package
  ```
  This builds the component library to the `dist` directory.

- **Build for local development**:
  ```bash
  npm run build:local
  ```
  This builds the component library for local development.

- **Build styles**:
  ```bash
  npm run build:styles
  ```
  This builds the Tailwind CSS styles.

### Configuration Files

- **astro.config.ts**: Configures Astro with integrations for MDX, icons, compression, and Svelte.
- **svelte.config.js**: Configures Svelte with vitePreprocess.
- **tsconfig.json**: Configures TypeScript with strict type checking and path aliases.
- **eslint.config.js**: Configures ESLint for JavaScript, TypeScript, and Astro files.

## Testing Information

### Testing Framework

The project uses Vitest as the testing framework, along with Testing Library for component testing.

### Running Tests

- **Run all tests**:
  ```bash
  npm test
  ```

- **Run tests in watch mode**:
  ```bash
  npm run test:watch
  ```

- **Run tests with coverage**:
  ```bash
  npm run test:coverage
  ```

### Adding Tests

1. Create a `__tests__` directory in the component directory:
   ```bash
   mkdir -p src/components/YourComponent/__tests__
   ```

2. Create a test file with a `.test.ts` or `.spec.ts` extension:
   ```bash
   touch src/components/YourComponent/__tests__/YourComponent.test.ts
   ```

3. Write your tests using Vitest:

   ```typescript
   import { describe, it, expect } from 'vitest';
   
   // For testing utility functions or non-UI code
   import { yourFunction } from '../your-file';
   
   describe('Your Test Suite', () => {
     it('should do something', () => {
       const result = yourFunction();
       expect(result).toBe(expectedValue);
     });
   });
   ```

### Testing Components

Due to the project using Svelte 5, which has a different component model than Svelte 4, direct component rendering in tests can be challenging. Instead, focus on testing:

1. **Utility functions** that components use
2. **Theme variants** and styling logic
3. **Helper functions** and business logic

For example, to test a component's theme variants:

```typescript
import { describe, it, expect } from 'vitest';
import { themeVariants } from '../theme-variants';

describe('Component Theme Variants', () => {
  it('has the correct default variant', () => {
    const classes = themeVariants({ variant: 'default' });
    expect(classes).toContain('expected-class');
  });
});
```

## Additional Development Information

### Project Structure

- **src/components/**: Contains all UI components, each in its own directory
- **src/assets/**: Contains static assets like images and styles
- **src/utils/**: Contains utility functions
- **src/pages/**: Contains Astro pages for the documentation site
- **src/playground/**: Contains playground components for testing
- **src/vendor-config/**: Contains vendor configuration

### Component Structure

Each component typically follows this structure:

```
ComponentName/
├── ComponentName.astro       # Astro implementation
├── ComponentName.svelte      # Svelte implementation
├── theme-variants.ts         # Styling variants using tailwind-variants
├── types.ts                  # TypeScript types
└── __tests__/                # Tests
    └── ComponentName.test.ts
```

### Code Style

The project uses ESLint and Prettier for code formatting and linting:

- **Check code style**:
  ```bash
  npm run check
  ```

- **Fix code style issues**:
  ```bash
  npm run fix
  ```

### Creating New Components

The project includes a script to create new components:

```bash
npm run create-component ComponentName
```

### Publishing

The package is published to npm using GitHub Actions. To publish a new version:

1. Create a new tag:
   ```bash
   git tag -a v0.x.x -m "Release message"
   git push origin v0.x.x
   ```

2. Go to the GitHub releases page and create a new release using the tag.

### Path Aliases

The project uses the `~` path alias to reference files from the `src` directory:

```typescript
import { Component } from '~/components/Component';
```

## Troubleshooting

### Common Issues

1. **Svelte 5 Compatibility**: The project uses Svelte 5, which has a different component model than Svelte 4. Be aware of the differences when working with components.

2. **Testing Components**: Due to Svelte 5's server-side rendering approach, testing components directly can be challenging. Focus on testing utility functions and theme variants instead.

3. **Build Errors**: If you encounter build errors, check that all dependencies are installed and that your Node.js version is compatible.
