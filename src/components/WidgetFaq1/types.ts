import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { ItemGrid0Props } from '../ItemGrid0/types';
import type { Card4Props } from '../Card4/types';
import type { Snippet } from 'svelte';

export type WidgetFaq1Props = {
  items?: Card4Props[];
  isAfterContent?: boolean;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & WidgetWrapperProps &
  ItemGrid0Props &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;

export type SvelteWidgetFaq1Props = {
  items?: Card4Props[];
  isAfterContent?: boolean;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & SvelteWidgetWrapperProps &
  ItemGrid0Props &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;
