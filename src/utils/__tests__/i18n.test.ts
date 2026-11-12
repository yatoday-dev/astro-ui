import { describe, it, expect } from 'vitest';
import { buildAlternateLocales, resolvePageLocale, toOgLocale } from '../i18n';

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

describe('toOgLocale', () => {
  it('adds the likely territory to a bare language', () => {
    expect(toOgLocale('uk')).toBe('uk_UA');
    expect(toOgLocale('es')).toBe('es_ES');
    expect(toOgLocale('ru')).toBe('ru_RU');
    expect(toOgLocale('en')).toBe('en_US');
    expect(toOgLocale('de')).toBe('de_DE');
  });

  it('keeps a territory the code already carries', () => {
    expect(toOgLocale('en-GB')).toBe('en_GB');
    expect(toOgLocale('pt_BR')).toBe('pt_BR');
  });

  it('takes the site override first', () => {
    expect(toOgLocale('en', { en: 'en_GB' })).toBe('en_GB');
    expect(toOgLocale('es', { en: 'en_GB' })).toBe('es_ES');
  });

  it('refuses something that is not a locale code', () => {
    expect(() => toOgLocale('not a locale')).toThrow(/not a locale code/);
  });
});

describe('buildAlternateLocales', () => {
  const site = 'https://example.com';
  const config = { locales: ['es', 'en', 'uk'], defaultLocale: 'es' };

  it('swaps the leading locale segment for every language, with x-default', () => {
    expect(buildAlternateLocales('/uk/pricing/', site, config)).toEqual([
      { locale: 'es', url: 'https://example.com/es/pricing/' },
      { locale: 'en', url: 'https://example.com/en/pricing/' },
      { locale: 'uk', url: 'https://example.com/uk/pricing/' },
      { locale: 'x-default', url: 'https://example.com/es/pricing/' },
    ]);
  });

  it('tolerates a missing trailing slash', () => {
    expect(buildAlternateLocales('/en/pricing', site, config)[0]).toEqual({
      locale: 'es',
      url: 'https://example.com/es/pricing/',
    });
  });

  it('swaps only the leading segment, not a later one that looks like a locale', () => {
    expect(buildAlternateLocales('/en/es/', site, config)[2]).toEqual({
      locale: 'uk',
      url: 'https://example.com/uk/es/',
    });
  });

  // The 404 case: every language used to be claimed at the page's own address.
  it('lists nothing for a path outside the per-locale tree of a multilingual site', () => {
    expect(buildAlternateLocales('/404/', site, config)).toEqual([]);
    expect(buildAlternateLocales('/legal/privacy/', site, config)).toEqual([]);
  });

  it('lists a single-language page as itself', () => {
    expect(buildAlternateLocales('/legal/privacy/', site, { locales: ['es'], defaultLocale: 'es' })).toEqual([
      { locale: 'es', url: 'https://example.com/legal/privacy/' },
      { locale: 'x-default', url: 'https://example.com/legal/privacy/' },
    ]);
  });

  it('takes alternateUrls as given, only for the languages that have one', () => {
    expect(
      buildAlternateLocales('/en/blog/hello/', site, config, {
        en: 'https://example.com/en/blog/hello/',
        es: 'https://example.com/es/blog/hola/',
      })
    ).toEqual([
      { locale: 'es', url: 'https://example.com/es/blog/hola/' },
      { locale: 'en', url: 'https://example.com/en/blog/hello/' },
      { locale: 'x-default', url: 'https://example.com/es/blog/hola/' },
    ]);
  });
});
