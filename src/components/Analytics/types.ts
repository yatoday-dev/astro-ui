export type AnalyticsProps = {
  googleAnalyticsId?: string;
  partytown?: boolean;
};

export type AnalyticsGoogleProps = {
  id: string;
  partytown?: boolean;
  /**
   * If true, analytics will only load after user accepts cookie consent.
   * Requires CookieConsent component to be present on the page.
   * @default false
   */
  requireConsent?: boolean;
};

export type AnalyticsGTMProps = {
  id: string;
  /**
   * If true, GTM will only load after user interaction (scroll, click, touch).
   * This improves page load performance by deferring third-party scripts.
   * @default false
   */
  defer?: boolean;
};

export type SvelteAnalyticsProps = AnalyticsProps;
