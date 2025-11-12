import type { Item, ToAction } from '../../types';
import type { WidgetFeatures0Props, SvelteWidgetFeatures0Props } from '../WidgetFeatures0/types.ts';
import type { HeadlineProps } from '../Headline/types.ts';
import type { Snippet } from 'svelte';

export type WidgetSteps1Props = {
  callToAction?: ToAction;
  isReversed?: boolean;
  isAfterContent?: boolean;
  items?: Item[];
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & WidgetFeatures0Props &
  Omit<HeadlineProps, 'as' | 'asSubtitle'>;

export type SvelteWidgetSteps1Props = {
  callToAction?: ToAction | Snippet;
  isReversed?: boolean;
  isAfterContent?: boolean;
  items?: Item[];
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & SvelteWidgetFeatures0Props &
  Omit<HeadlineProps, 'as' | 'asSubtitle'>;
