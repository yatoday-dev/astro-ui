import type { MetaData, MetaDataOpenGraph, MetaDataRobots, MetaDataTwitter } from '../../components/Metadata/types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type LayoutProps = {
  title?: string;
  description?: string;
  ignoreTitleTemplate?: boolean;
  canonical?: string;

  robots?: MetaDataRobots;
  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
  metadata?: MetaData;
  class?: string;
};

export type SvelteLayoutProps = WithElementRef<HTMLAttributes<HTMLDivElement>> &
  LayoutProps & {
    ref?: HTMLDivElement | null;
    children?: Snippet;
  };
