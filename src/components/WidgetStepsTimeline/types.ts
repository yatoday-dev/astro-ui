import type { Item, Image } from '../../types';
import type { WidgetFeatures0Props, SvelteWidgetFeatures0Props } from '../WidgetFeatures0/types.ts';
import type { HeadlineProps } from '../Headline/types.ts';
import type { Snippet } from 'svelte';

export type WidgetStepsTimelineProps = {
  isReversed?: boolean;
  items?: Item[];
  image?: string | Image;
  defaultIcon?: string;
  isAfterContent?: boolean;
} & WidgetFeatures0Props &
  HeadlineProps;

export type SvelteWidgetStepsTimelineProps = {
  isReversed?: boolean;
  items?: Item[];
  image?: string | Image | Snippet;
  defaultIcon?: string;
  isAfterContent?: boolean;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
} & SvelteWidgetFeatures0Props &
  HeadlineProps;
