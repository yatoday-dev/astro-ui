import type { MetaData, MetaDataOpenGraph, MetaDataRobots, MetaDataTwitter } from '~/components/SeoMetadata/types';

export type LayoutProps = {
  title?: string;
  description?: string;
  ignoreTitleTemplate?: boolean;
  canonical?: string;

  robots?: MetaDataRobots;
  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
  metadata?: MetaData;
};
