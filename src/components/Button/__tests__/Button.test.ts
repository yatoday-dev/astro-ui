import { describe, it, expect } from 'vitest';
import { themeVariants } from '../theme-variants';

describe('Button Theme Variants', () => {
  it('has the correct default variant', () => {
    const classes = themeVariants({ variant: 'default' });
    expect(classes).toContain('bg-secondary');
    expect(classes).toContain('text-secondary-foreground');
  });

  it('has the correct primary variant', () => {
    const classes = themeVariants({ variant: 'primary' });
    expect(classes).toContain('bg-primary');
    expect(classes).toContain('text-primary-foreground');
  });

  it('has the correct size classes for default size', () => {
    const classes = themeVariants({ size: 'default' });
    expect(classes).toContain('px-6');
    expect(classes).toContain('h-10');
  });

  it('has the correct size classes for small size', () => {
    const classes = themeVariants({ size: 'sm' });
    expect(classes).toContain('h-8');
    expect(classes).toContain('px-4');
  });
});
