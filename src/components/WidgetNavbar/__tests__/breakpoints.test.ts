import { describe, expect, it } from 'vitest';
import navbarBreakpoints, { type NavbarBreakpoint } from '../breakpoints';

/** Tailwind 4's default breakpoints, which the classes' prefixes stand for. */
const widths: Record<NavbarBreakpoint, string> = { sm: '40rem', md: '48rem', lg: '64rem', xl: '80rem' };

const breakpoints = Object.keys(navbarBreakpoints) as NavbarBreakpoint[];

describe('navbarBreakpoints', () => {
  it('gives every breakpoint the same parts', () => {
    const parts = Object.keys(navbarBreakpoints.md).sort();
    for (const bp of breakpoints) {
      expect(Object.keys(navbarBreakpoints[bp]).sort(), bp).toEqual(parts);
    }
  });

  it('prefixes each set with its own breakpoint only', () => {
    for (const bp of breakpoints) {
      for (const [part, classes] of Object.entries(navbarBreakpoints[bp])) {
        if (part === 'foldQuery') continue;
        for (const cls of classes.split(' ')) {
          const prefix = /^([a-z0-9]+):/.exec(cls)?.[1];
          if (prefix && (breakpoints as string[]).includes(prefix)) {
            expect(prefix, `${bp}.${part}: ${cls}`).toBe(bp);
          }
        }
      }
    }
  });

  it('folds the menu below the width its classes unfold it at', () => {
    for (const bp of breakpoints) {
      expect(navbarBreakpoints[bp].foldQuery).toBe(`(width < ${widths[bp]})`);
    }
  });

  it('keeps md the navbar’s original layout', () => {
    expect(navbarBreakpoints.md.nav).toBe(
      'items-center w-full md:w-auto hidden md:flex md:mx-5 text-default overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:justify-self-center'
    );
    expect(navbarBreakpoints.md.toggle).toBe('flex items-center md:hidden');
    expect(navbarBreakpoints.md.actions).toBe(
      'hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0 md:justify-self-end'
    );
    expect(navbarBreakpoints.md.pinned).toBe('bg-background md:bg-background/90 md:backdrop-blur-md');
  });
});
