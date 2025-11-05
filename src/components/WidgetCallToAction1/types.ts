import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { ToAction } from '../../types';
import type { Snippet } from 'svelte';

export type WidgetCallToAction1Props = {
  actions?: ToAction[];
  isAfterContent?: boolean;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;

export type SvelteWidgetCallToAction1Props = {
  actions?: ToAction[] | Snippet;
  isAfterContent?: boolean;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
} & SvelteWidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
