import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Item, ToAction } from '../../types';
import type { Snippet } from 'svelte';

export type WidgetStatsProps = {
  via?: any;
  items?: Item[];
  callToAction?: ToAction;
  isAfterContent?: boolean;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;

export type SvelteWidgetStatsProps = {
  via?: any;
  items?: Item[];
  callToAction?: ToAction;
  isAfterContent?: boolean;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
} & SvelteWidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
