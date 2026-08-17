export type AnalyticsProps = {
  googleAnalyticsId?: string;
  partytown?: boolean;
};

export type AnalyticsGoogleProps = {
  id: string;
  partytown?: boolean;
  /**
   * Load gtag.js only after the visitor accepts, rather than loading it up front
   * and relying on Consent Mode's `denied` default to suppress storage. Stricter:
   * a visitor who refuses is never disclosed to Google, not even by IP.
   *
   * Requires the CookieConsent component on the page — without it the accept
   * event never fires and analytics never loads.
   *
   * @default true
   */
  requireConsent?: boolean;
};

export type AnalyticsGTMProps = {
  id: string;
  /**
   * If true, GTM will only load after user interaction (scroll, click, touch).
   * This improves page load performance by deferring third-party scripts.
   *
   * A performance option, not a privacy one: it loads regardless of the consent
   * decision. `requireConsent` supersedes it.
   *
   * @default false
   */
  defer?: boolean;
  /**
   * Load gtm.js only after the visitor accepts, rather than loading it up front
   * and relying on Consent Mode's `denied` default. On a site with no GA4 id of
   * its own, this is the only thing standing between a visitor who refused and a
   * request to Google.
   *
   * Requires the CookieConsent component on the page.
   *
   * @default true
   */
  requireConsent?: boolean;
};

export type SvelteAnalyticsProps = AnalyticsProps;
