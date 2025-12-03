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
};

export type SvelteAnalyticsProps = AnalyticsProps;
