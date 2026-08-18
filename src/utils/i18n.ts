/**
 * i18n utility functions for extracting locale configuration from Astro's runtime context.
 * These utilities work whether or not i18n is enabled in the consuming project.
 */

// Dynamic imports to handle case when i18n is not enabled
const i18nConfig: { locales?: unknown[]; defaultLocale?: string } | null = null;
const toCodesFunction: ((locales: unknown[]) => string[]) | null = null;

// Try to load i18n modules - they may not be available if i18n is not configured
try {
  // Using dynamic imports wrapped in try-catch won't work at build time
  // Instead, we'll rely on the consuming project to pass config via props
} catch {
  // i18n not enabled - will use fallback values
}

/**
 * Convert locale config items to string codes.
 * Handles both simple string locales and complex locale objects.
 */
function localesToCodes(locales: unknown[]): string[] {
  return locales.map((locale) => {
    if (typeof locale === 'string') {
      return locale;
    }
    if (typeof locale === 'object' && locale !== null && 'path' in locale) {
      return (locale as { path: string }).path;
    }
    return String(locale);
  });
}

/**
 * Get the list of supported locales.
 * Accepts optional config object with locales array.
 * Falls back to ['en'] if no config provided.
 *
 * @param config - Optional config object with locales array
 */
export function getLocales(config?: { locales?: unknown[] }): string[] {
  if (config?.locales && Array.isArray(config.locales)) {
    return localesToCodes(config.locales);
  }
  if (i18nConfig?.locales && toCodesFunction) {
    return toCodesFunction(i18nConfig.locales);
  }
  // Fallback for when i18n is not configured
  return ['en'];
}

/**
 * Get the default locale.
 * Accepts optional config object with defaultLocale string.
 * Falls back to 'en' if no config provided.
 *
 * @param config - Optional config object with defaultLocale string
 */
export function getDefaultLocale(config?: { defaultLocale?: string }): string {
  if (config?.defaultLocale) {
    return config.defaultLocale;
  }
  if (i18nConfig?.defaultLocale) {
    return i18nConfig.defaultLocale;
  }
  // Fallback for when i18n is not configured
  return 'en';
}

export interface PageLocaleConfig {
  locales?: unknown[];
  defaultLocale?: string;
  /** Site language from config, used when no locale set is configured at all. */
  language?: string;
}

/**
 * Work out which language a page is actually written in.
 *
 * The answer is the leading path segment when it names one of the page's
 * locales (`/ru/prices/` is Russian), and the default locale otherwise. That
 * "otherwise" is the interesting half: a page served outside the per-locale
 * tree — legal documents filed in one language at `/legal/…`, say — carries no
 * prefix to read, so it falls back to the default of *its own* locale config.
 * Passing such a page a single-locale config (`{ locales: ['es'] }`, the same
 * override that keeps its hreflang tags honest) is therefore enough to have it
 * announced as Spanish rather than as the site default.
 *
 * Every consumer of "what language is this page?" must go through here. Layout
 * previously answered it from `Astro.currentLocale`, which knows nothing about
 * a page-level override, so a single-language page ended up declaring one
 * language in `<html lang>` and another in `og:locale`.
 *
 * @param pathname - Page pathname, with or without a trailing slash
 * @param config - Locale config in effect for this page
 */
export function resolvePageLocale(pathname: string, config?: PageLocaleConfig): string {
  const [firstSegment] = pathname.split('/').filter(Boolean);
  if (firstSegment && getLocales(config).includes(firstSegment)) {
    return firstSegment;
  }
  return config?.defaultLocale || config?.language || getDefaultLocale(config);
}
