import type { WidgetFeatures0Props, SvelteWidgetFeatures0Props } from '../WidgetFeatures0/types';
import type { HeadlineProps } from '../Headline/types';
import type { Image } from '../../types';
import type { Snippet } from 'svelte';

export type WidgetFeaturesCardProps = {
  via?: any;
  viaGrid?: any;
  items?: any[];
  columns?: number;
  image?: Image | string;
} & WidgetFeatures0Props;

export type SvelteWidgetFeaturesCardProps = {
  via?: any;
  viaGrid?: any;
  items?: any[];
  columns?: number;
  image?: Image | string | Snippet;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
  children?: Snippet;
} & SvelteWidgetFeatures0Props;
