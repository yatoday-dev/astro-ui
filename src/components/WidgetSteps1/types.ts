import type { Item, ToAction } from '../../types';
import type { WidgetFeatures0Props, SvelteWidgetFeatures0Props } from '../WidgetFeatures0/types.ts';
import type { HeadlineProps } from '../Headline/types.ts';
import type { Snippet } from 'svelte';

export type WidgetSteps1Props = {
  callToAction?: ToAction;
  isReversed?: boolean;
  isAfterContent?: boolean;
  items?: Item[];
} & WidgetFeatures0Props &
  HeadlineProps;

export type SvelteWidgetSteps1Props = {
  callToAction?: ToAction | Snippet;
  isReversed?: boolean;
  isAfterContent?: boolean;
  items?: Item[];
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
} & SvelteWidgetFeatures0Props &
  HeadlineProps;
