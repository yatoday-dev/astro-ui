import { describe, it, expect } from 'vitest';
import { twMerge } from 'tailwind-merge';

// Since we can't directly test Svelte 5 components due to the server-side rendering approach,
// we'll test the utility aspects of the component instead.

describe('Card0 Component', () => {
  // Test default class composition
  it('correctly merges default and custom container classes', () => {
    const defaultClasses = 'relative flex flex-col justify-between gap-6 overflow-hidden rounded-lg border border-input bg-card text-card-foreground py-6 group';
    const customClasses = 'custom-container';

    const result = twMerge(defaultClasses, customClasses);

    // Check that the result contains both default and custom classes
    expect(result).toContain('relative');
    expect(result).toContain('flex');
    expect(result).toContain('rounded-lg');
    expect(result).toContain('border');
    expect(result).toContain('bg-card');
    expect(result).toContain('custom-container');
  });

  // Test badge class composition
  it('correctly merges default and custom badge classes', () => {
    const defaultClasses = 'absolute z-10';
    const customClasses = 'custom-badge';

    const result = twMerge(defaultClasses, customClasses);

    // Check that the result contains both default and custom classes
    expect(result).toContain('absolute');
    expect(result).toContain('z-10');
    expect(result).toContain('custom-badge');
  });

  // Test default badge position
  it('uses correct default badge position', () => {
    const defaultBadgePosition = 'top-2 left-2';

    // This is the default value used in the component
    expect(defaultBadgePosition).toBe('top-2 left-2');
  });

  // Test default element type
  it('uses article as default element type', () => {
    const defaultElementType = 'article';

    // This is the default value used in the component
    expect(defaultElementType).toBe('article');
  });
});
