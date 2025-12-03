import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Snippet } from 'svelte';

export type FaqItem = {
  title: string;
  description: string;
};

export type WidgetFaq2Props = {
  items?: FaqItem[];
  isAfterContent?: boolean;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
  openFirstItem?: boolean;
  openAllItems?: boolean;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;

export type SvelteWidgetFaq2Props = {
  items?: FaqItem[];
  isAfterContent?: boolean;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
  openFirstItem?: boolean;
  openAllItems?: boolean;
} & SvelteWidgetWrapperProps &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;
