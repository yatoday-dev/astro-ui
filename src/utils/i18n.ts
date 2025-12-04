/**
 * i18n utility functions for extracting locale configuration from Astro's runtime context.
 * These utilities work whether or not i18n is enabled in the consuming project.
 */

// Dynamic imports to handle case when i18n is not enabled
let i18nConfig: { locales?: unknown[]; defaultLocale?: string } | null = null;
let toCodesFunction: ((locales: unknown[]) => string[]) | null = null;

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
