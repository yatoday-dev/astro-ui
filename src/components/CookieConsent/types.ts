import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

/**
 * A purpose the site actually pursues with non-essential storage.
 *
 * Consent has to be specific to a purpose (GDPR art. 6.1.a and 7.2), so a site
 * must ask for exactly what it uses and nothing more. Declaring the purposes
 * per site is what keeps the banner, the stored record and the published cookie
 * policy describing the same thing.
 */
export type ConsentPurpose = 'analytics' | 'advertising';

/**
 * Consent categories as the consent API stores them.
 *
 * These are the category names, not Google Consent Mode signal names: one
 * category can map to several signals (`advertising` covers `ad_storage`,
 * `ad_user_data` and `ad_personalization`), and the record has to stay readable
 * independently of any one vendor's tagging scheme.
 */
export type ConsentCategories = {
  /** Strictly necessary storage. Always true — it is never consent-based. */
  necessary: true;
  /** Measurement of site usage. */
  analytics: boolean;
  /** Advertising, remarketing and conversion attribution. */
  marketing: boolean;
};

/**
 * Consent data sent to backend API
 */
export type ConsentPayload = {
  consent_id: string;
  organisation_suid?: string;
  status: 'accepted' | 'denied';
  consent_version: string;
  categories: ConsentCategories;
  page_url: string;
  locale: string;
  user_agent: string;
};

export type CookieConsentProps = {
  /**
   * Title text for the banner
   * @example "This website uses cookies"
   */
  title?: string;

  /**
   * Description text explaining cookie usage
   * @example "We use cookies to personalize content and ads..."
   */
  description?: string;

  /**
   * Text for the deny/reject button
   * @example "Deny"
   */
  denyText?: string;

  /**
   * Text for the allow/accept all button
   * @example "Allow all"
   */
  allowText?: string;

  /**
   * Cookie name to store consent ID
   * @default "cookie_consent_id"
   */
  cookieName?: string;

  /**
   * Cookie expiration in days
   * @default 365
   */
  cookieExpireDays?: number;

  /**
   * Position of the banner
   * @default "bottom"
   */
  position?: 'bottom' | 'top' | 'center';

  /**
   * Version of the consent text (for audit trail)
   * @default "1.0"
   */
  consentVersion?: string;

  /**
   * Backend API endpoint for storing consent
   * @example "https://app.yatoday.es/api/consent"
   */
  apiEndpoint?: string;

  /**
   * Organisation SUID for multi-tenant consent tracking
   * @example "org_34c7Pnb1WLgPqRLcz7OlpdP9hIS"
   */
  organisationSuid?: string;

  /**
   * Google Analytics Measurement ID (for Consent Mode)
   * @example "G-XXXXXXXXXX"
   */
  googleAnalyticsId?: string;

  /**
   * The non-essential purposes this site actually pursues.
   *
   * Only the declared purposes are asked for, recorded and granted; every other
   * Consent Mode signal is pinned to `denied` for the lifetime of the page. The
   * default is analytics only, because that is what a site gets by wiring up
   * GA4 — a site that adds advertising tags has to say so here, and update its
   * cookie policy in the same change.
   *
   * A single non-essential purpose is what makes a two-button
   * accept-all / reject-all banner sufficient under the AEPD cookie guide.
   * Declaring more than one purpose means the banner owes the visitor a
   * per-purpose choice, which this component does not yet offer.
   *
   * @default ["analytics"]
   */
  purposes?: ConsentPurpose[];

  /**
   * CSS classes for customization
   */
  classes?: {
    container?: string;
    content?: string;
    title?: string;
    description?: string;
    actions?: string;
    denyButton?: string;
    allowButton?: string;
  };

  /**
   * Text for the consent info dialog (shown when clicking FAB)
   */
  infoDialog?: {
    /** Label for consent date field, e.g., "Consent date:" */
    consentDateLabel?: string;
    /** Label for consent ID field, e.g., "Your consent ID:" */
    consentIdLabel?: string;
    /** Text for change consent button, e.g., "Change your consent" */
    changeConsentText?: string;
    /** Text for close button, e.g., "Close" */
    closeText?: string;
  };
};

export type SvelteCookieConsentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> &
  CookieConsentProps & {
    ref?: HTMLDivElement | null;
    /**
     * Snippet for custom title content
     */
    titleSnippet?: Snippet;
    /**
     * Snippet for custom description content
     */
    descriptionSnippet?: Snippet;
  };

/**
 * Consent status values
 */
export type ConsentStatus = 'accepted' | 'denied' | null;
