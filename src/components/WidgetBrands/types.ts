import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Image } from '~/types';
import type { Snippet } from 'svelte';

export type WidgetBrandsProps = {
  icons?: Array<string>;
  images?: Array<Image>;
  isAfterContent?: boolean;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;

export type SvelteWidgetBrandsProps = {
  icons?: Array<string>;
  images?: Array<Image>;
  isAfterContent?: boolean;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & SvelteWidgetWrapperProps &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;
