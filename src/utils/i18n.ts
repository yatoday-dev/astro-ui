/**
 * i18n utility functions for extracting locale configuration from Astro's runtime context.
 * These utilities read from Astro's i18n configuration to avoid hardcoding locale values.
 */

import { i18n } from 'astro:config/client';
import { toCodes } from 'astro:i18n';

// Type for the Astro global object - not used but kept for reference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface _AstroGlobal {
  locales?: string[];
  defaultLocale?: string;
}

/**
 * Get the list of supported locales from Astro's i18n configuration.
 * Falls back to ['en'] if i18n is not configured.
 */
export function getLocales(_astro?: unknown): string[] {
  // Use Astro's config client to get the i18n locales
  if (i18n?.locales) {
    return toCodes(i18n.locales);
  }
  // Fallback for when i18n is not configured
  return ['en'];
}

/**
 * Get the default locale from Astro's i18n configuration.
 * Falls back to 'en' if i18n is not configured.
 */
export function getDefaultLocale(_astro?: unknown): string {
  // Use Astro's config client to get the default locale
  if (i18n?.defaultLocale) {
    return i18n.defaultLocale;
  }
  // Fallback for when i18n is not configured
  return 'en';
}
