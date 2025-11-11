import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { ItemGrid0Props } from '../ItemGrid0/types';
import type { Card4Props } from '../Card4/types';
import type { Snippet } from 'svelte';

export type WidgetFaq1Props = {
  items?: Card4Props[];
  isAfterContent?: boolean;
} & WidgetWrapperProps &
  ItemGrid0Props &
  Omit<HeadlineProps, 'classes'>;

export type SvelteWidgetFaq1Props = {
  items?: Card4Props[];
  isAfterContent?: boolean;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
} & SvelteWidgetWrapperProps &
  ItemGrid0Props &
  Omit<HeadlineProps, 'classes'>;
