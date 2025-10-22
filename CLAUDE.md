# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**@yatoday/astro-ui** is a component library built primarily for Astro, with partial Svelte support. Currently in early development (v0.10.8), the library will be considered stable at v1.0.

**Important**: While all 52 components have `.svelte` files, only 5 components have fully implemented Svelte versions:
- Button
- Card0
- ConditionalWrapper
- CopyToClipboard
- QuantitySwitch

The remaining 47 Svelte files are stubs (2-7 lines with only type imports) awaiting implementation. All components have complete Astro implementations.

## Essential Commands

### Development
```bash
npm run dev                    # Start Astro dev server (documentation site)
npm run check                  # Run all checks (Astro, ESLint, Prettier)
npm run fix                    # Auto-fix ESLint and Prettier issues
npm run create-component Name  # Scaffold new component with both .astro and .svelte files
```

### Testing
```bash
npm test                # Run tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

### Building
```bash
npm run build                # Build documentation site (outputs to dist-doc/)
npm run build:package        # Build NPM package (outputs to dist/)
npm run build:styles         # Build Tailwind CSS only
npm run pub                  # Build and publish package locally
```

### Quality Checks
```bash
npm run check:astro          # Check Astro files
npm run check:eslint         # Check ESLint
npm run check:prettier       # Check Prettier formatting
```

## Architecture Overview

### Component System Architecture

Each component directory contains:
- `ComponentName.astro` - Astro component (always implemented)
- `ComponentName.svelte` - Svelte component (mostly stubs, only 5 fully implemented)
- `types.ts` - Shared type definitions

**Component Implementation Status**:
- **Astro**: All 52 components fully implemented
- **Svelte**: Only 5 components fully implemented (Button, Card0, ConditionalWrapper, CopyToClipboard, QuantitySwitch)
- **Svelte Stubs**: 47 components have placeholder `.svelte` files with only type imports

**When creating new Svelte implementations**: Follow the patterns in the 5 implemented components. Use Svelte 5 syntax (`$props`, `$bindable`, `{@render}`).

**Type Naming Convention**:
- `ComponentProps` - Generic props for both frameworks OR components without framework-specific features
- `SvelteComponentProps` - Svelte-specific props that extend generic props with `WithElementRef` from bits-ui

### Component Structure

```
src/components/ComponentName/
├── ComponentName.astro        # Astro implementation
├── ComponentName.svelte       # Svelte 5 implementation
├── types.ts                   # TypeScript definitions
├── theme-variants.ts          # [optional] Styling variants using tailwind-variants
└── __tests__/                 # [optional] Vitest test files
```

### Build System Architecture

The build process transforms source files for NPM distribution:

1. **Source → Distribution Mapping**:
   - `src/components/` → `dist/components/`
   - `src/utils/` → `dist/utils/`
   - `src/vendor-config/` → `dist/vendor-config/`
   - `src/assets/styles/themes/` → `dist/styles/themes/`
   - `src/types.d.ts` → `dist/index.d.ts`

2. **Generated Entry Points**:
   - `dist/astro.js` + `dist/astro.d.ts` - Auto-generated imports for all Astro components
   - `dist/svelte.js` + `dist/svelte.d.ts` - Auto-generated imports for all Svelte components
   - `dist/index.js` - Utility re-exports

3. **Build Scripts**:
   - `scripts/build.js` - Main build orchestration
   - `scripts/buildImports.js` - Dynamically scans components to generate imports
   - `scripts/buildTypes.js` - Auto-generates TypeScript declarations for both frameworks

**Critical**: The entry point files (`astro.js`, `svelte.js`, etc.) are AUTO-GENERATED. Never edit them directly. They're created by scanning the components directory during the build process.

### Package Export Structure

The package.json exports field defines consumer entry points:
```json
{
  ".": "./index.js",
  "./astro": "./astro.js",
  "./svelte": "./svelte.js",
  "./vendor-config": "./vendor-config/index.ts"
}
```

Export meanings:
- `"."` - Utilities only
- `"./astro"` - All Astro components
- `"./svelte"` - All Svelte components
- `"./vendor-config"` - Config integration

### Testing Approach

- **Framework**: Vitest with jsdom environment
- **Library**: @testing-library/svelte for Svelte component testing
- **Pattern**: Tests focus on behavior and styling output (checking CSS classes for variants)
- **Location**: Colocated in `__tests__/` directories within component folders
- **Alias**: Use `~/*` to reference `src/*` in test files

Current test coverage is minimal (Button, DarkMode). When adding tests, follow the pattern of testing theme variants and behavior rather than full rendering.

## Component Development Patterns

### Astro Components (`.astro` files)

```astro
---
import type { ComponentProps as Props } from './types';
import { cn } from '~/utils';

const { variant = 'default', size = 'default', class: className, ...rest } = Astro.props;
---

<div class={cn(themeVariants({ size, variant }), className)} {...rest}>
  <slot />
  {Astro.slots.has('footer') && <slot name="footer" />}
</div>
```

**Key conventions**:
- Import types with `as Props`
- Use `Astro.props` for prop access
- Use `Astro.slots.has()` to check for named slots before rendering
- Use `set:html` for sanitized HTML injection
- Use `cn()` utility for class merging (from `~/utils`)

### Svelte Components (`.svelte` files - Svelte 5)

```svelte
<script lang="ts">
  import type { SvelteComponentProps } from './types';

  let {
    class: className = '',
    ref = $bindable(null),
    children,
    ...restProps
  }: SvelteComponentProps = $props()
</script>

{#if condition}
  <a bind:this={ref} {...restProps}>
    {@render children?.()}
  </a>
{/if}
```

**Key conventions**:
- Use Svelte 5 runes: `$props()`, `$bindable()`, `$state()`
- Use `{@render children?.()}` for snippet rendering
- Export `ref` with `$bindable()` for element reference binding
- Spread `{...restProps}` for additional attributes

### Type Definitions

**Simple components** (no framework-specific features):
```typescript
export type ComponentProps = {
  variant?: 'default' | 'primary';
  class?: string;
}
```

**Dual-type components** (framework-specific features):
```typescript
import type { WithElementRef } from 'bits-ui';
import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

// Generic props
export type ButtonProps = {
  variant?: ButtonVariant;
  text?: string;
  class?: string;
}

// Svelte-specific with element refs and DOM attributes
export type SvelteButtonProps = WithElementRef<HTMLButtonAttributes> &
  WithElementRef<HTMLAnchorAttributes> &
  ButtonProps;
```

### Styling with Tailwind Variants

Use `tailwind-variants` for component style variants:

```typescript
import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  }
});
```

**Important**: The library uses CSS custom properties (e.g., `--radius-btn`) for theming. Check `src/assets/styles/themes/default.css` for available variables.

## Key Utilities

Located in `src/utils/`:

- **DOMUtils.ts**: `cn()` (class merging), `toggleClasses()`, `addClasses()`, `removeClasses()`, `attachEvent()`
- **URLUtils.ts**: `trimSlash()`, `createPath()`, `cleanSlug()`, `getCanonical()`
- **images-optimization.ts**: Image optimization using unpic
- **slugify.ts**: URL-safe string conversion

**Always use `cn()`** from DOMUtils for combining classes. It uses `clsx` + `tailwind-merge` to prevent Tailwind class conflicts.

## Vendor Config Plugin

`src/vendor-config/` is a custom Astro integration that:
- Loads YAML configuration files
- Provides virtual module `vendor:config` for accessing config
- Auto-generates TypeScript definitions
- Watches config file for hot-reload

Used primarily for the documentation/playground site.

## Publishing Workflow

The project uses GitHub Actions for automated publishing:

1. Update version in `package.json`
2. Commit changes
3. Create and push git tag:
   ```bash
   git tag -a v0.10.8 -m "Release v0.10.8"
   git push origin v0.10.8
   ```
4. Create GitHub Release using the tag
5. GitHub Action automatically runs `npm run build:package` and publishes from `dist/`

**Important**: The `dist/` directory is the build output for NPM. Never manually edit files in `dist/`.

## Code Quality

- **ESLint**: Flat config supporting Astro, TypeScript, and Svelte
- **Prettier**: 120 char width, 2-space indentation, Astro plugin enabled
- **Pre-commit**: Husky + lint-staged runs ESLint on staged files
- **TypeScript**: Strict mode enabled with `~/` path alias for `src/`

Relaxed rules in ESLint config:
- `@typescript-eslint/no-empty-object-type`: off
- `@typescript-eslint/no-unused-vars`: off
- `@typescript-eslint/no-explicit-any`: off

## Important Conventions

1. **Never edit generated files**: `dist/astro.js`, `dist/svelte.js`, `dist/astro.d.ts`, `dist/svelte.d.ts` are auto-generated
2. **Component naming**: Use PascalCase (e.g., `Button`, `Card0`, `WidgetHero1`)
3. **Widget numbering**: Widgets use numeric suffixes (e.g., `WidgetHero1`, `WidgetHero2`) for variants
4. **Type file naming**: Always `types.ts` per component
5. **Theme file naming**: Always `theme-variants.ts` for styling variants
6. **Import paths**: Use `~/` alias for imports from `src/`
7. **Slot usage**: Check slot existence with `Astro.slots.has()` before rendering
8. **Svelte 5 syntax**: Use runes (`$props`, `$bindable`, `$state`) and `{@render}` for snippets

## Component Creation Workflow

### Creating New Components

```bash
# 1. Generate component scaffold
npm run create-component MyComponent

# 2. Implement the Astro version first
# 3. Define types in types.ts
# 4. [Optional] Add theme-variants.ts for styling
# 5. [Optional] Add tests in __tests__/
# 6. Create documentation in src/data/docs/MyComponent.mdx

# 7. Build package to test
npm run build:package
```

The build system will automatically:
- Include your component in the generated entry points
- Generate TypeScript declarations
- Copy component files to dist/

### Implementing Svelte Versions of Components

**Current Status**: 47 out of 52 components have only stub Svelte files. When implementing Svelte versions:

1. **Study the 5 implemented components** for patterns:
   - `Button.svelte` - Conditional rendering (button vs anchor), variant system
   - `Card0.svelte` - Complex layout with multiple slots
   - `ConditionalWrapper.svelte` - Wrapper pattern with conditional rendering
   - `CopyToClipboard.svelte` - Client-side interactivity, event handling
   - `QuantitySwitch.svelte` - State management, two-way binding

2. **Follow the Svelte 5 patterns**:
   - Use `$props()` for props
   - Use `$bindable()` for two-way binding (especially `ref`)
   - Use `{@render children?.()}` for slot content
   - Use `$state()` for component-local state

3. **Update types.ts** if needed:
   - Add `SvelteComponentProps` extending the generic `ComponentProps`
   - Include `WithElementRef<HTMLElementAttributes>` for element binding
   - Import appropriate HTML*Attributes from 'svelte/elements'

4. **Test the implementation**:
   - Ensure it matches the Astro component's functionality
   - Test with the documentation examples in `src/data/docs/`
   - Add tests in `__tests__/` if complex behavior exists

## Documentation and Examples

### Documentation Site

The `src/playground/` directory contains the documentation/demo site:
- Configuration in `src/playground/config.yaml`
- Built with `npm run build` (outputs to `dist-doc/`)
- Separate from package build (`dist/`)
- Uses the vendor-config plugin for configuration management

### Component Documentation

Component usage examples are located in `src/data/docs/` (49 MDX files):
- Format: `ComponentName.mdx` (e.g., `Button.mdx`, `Card0.mdx`)
- Contains live demos using the `Demo` component wrapper
- Shows various prop combinations and use cases
- When creating new components, add corresponding `.mdx` documentation with examples

## Development Notes

- The library is in **early development** - breaking changes expected until v1.0
- Inspired by Astrowind, Accessible Astro Components, and Webcoreui
- Documentation site: https://astro-ui.dev.yatoday.es
- Issues: https://github.com/yatoday-dev/astro-ui/issues
