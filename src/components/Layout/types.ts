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
  /** Classes for `<html>`. */
  class?: string;
  /**
   * Classes for `<body>`, merged over the defaults
   * (`antialiased bg-background text-foreground tracking-tight`): a conflicting
   * class replaces its default, e.g. `tracking-normal` replaces `tracking-tight`.
   */
  bodyClass?: string;
};

export type SvelteLayoutProps = WithElementRef<HTMLAttributes<HTMLDivElement>> &
  LayoutProps & {
    ref?: HTMLDivElement | null;
    children?: Snippet;
  };
