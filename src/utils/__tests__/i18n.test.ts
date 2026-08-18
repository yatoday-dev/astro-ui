import { describe, it, expect } from 'vitest';
import { resolvePageLocale } from '../i18n';

const SITE = { locales: ['en', 'es', 'ru'], defaultLocale: 'en', language: 'en' };

describe('resolvePageLocale', () => {
  it('reads the language from the leading path segment', () => {
    expect(resolvePageLocale('/ru/home-services/', SITE)).toBe('ru');
    expect(resolvePageLocale('/es/', SITE)).toBe('es');
    expect(resolvePageLocale('/en/about/', SITE)).toBe('en');
  });

  it('tolerates a missing trailing slash', () => {
    expect(resolvePageLocale('/ru/about', SITE)).toBe('ru');
  });

  it('falls back to the default locale for an unprefixed path', () => {
    expect(resolvePageLocale('/legal/privacy/', SITE)).toBe('en');
    expect(resolvePageLocale('/', SITE)).toBe('en');
  });

  it('does not mistake an ordinary first segment for a locale', () => {
    expect(resolvePageLocale('/english/', SITE)).toBe('en');
  });

  // The case Layout used to get wrong: a page that exists in one language only,
  // served outside the per-locale tree, must be announced in that language.
  it('honours a single-locale page override', () => {
    const page = { locales: ['es'], defaultLocale: 'es', language: 'en' };
    expect(resolvePageLocale('/legal/privacy/', page)).toBe('es');
  });

  it('still prefers the path segment when a page overrides with several locales', () => {
    const page = { locales: ['en', 'ru'], defaultLocale: 'en', language: 'en' };
    expect(resolvePageLocale('/ru/prices/', page)).toBe('ru');
  });

  it('falls back to the site language when no locale set is configured', () => {
    expect(resolvePageLocale('/about/', { language: 'es' })).toBe('es');
  });

  it('prefers an explicit default locale over the site language', () => {
    expect(resolvePageLocale('/about/', { defaultLocale: 'ru', language: 'es' })).toBe('ru');
  });

  it('falls back to English with no config at all', () => {
    expect(resolvePageLocale('/about/')).toBe('en');
  });
});
