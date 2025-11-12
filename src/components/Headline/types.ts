import type { HTMLTag } from 'astro/types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type HeadlineProps = {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: Record<string, string>;
  ['as']?: HTMLTag;
  asSubtitle?: HTMLTag;
  position?: 'center' | 'left' | 'right';
};

export type SvelteHeadlineProps = WithElementRef<HTMLAttributes<HTMLDivElement>> &
  HeadlineProps & {
    ref?: HTMLDivElement | null;
  };
