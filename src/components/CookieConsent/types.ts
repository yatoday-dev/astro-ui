import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

/**
 * Google Consent Mode v2 categories
 */
export type ConsentCategories = {
  /** Enables storage for analytics (e.g., visit duration) */
  analytics_storage?: boolean;
  /** Enables storage for advertising purposes */
  ad_storage?: boolean;
  /** Sets consent for sending user data to Google for advertising */
  ad_user_data?: boolean;
  /** Sets consent for personalized advertising */
  ad_personalization?: boolean;
};

/**
 * Consent data sent to backend API
 */
export type ConsentPayload = {
  consent_id: string;
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
   * Google Analytics Measurement ID (for Consent Mode)
   * @example "G-XXXXXXXXXX"
   */
  googleAnalyticsId?: string;

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
