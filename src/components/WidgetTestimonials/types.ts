import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Testimonial, ToAction } from '../../types';
import type { ItemGrid0Props } from '../ItemGrid0/types.ts';
import type { Snippet } from 'svelte';

export type WidgetTestimonialsProps = {
  items?: Testimonial[];
  callToAction?: ToAction;
  isAfterContent?: boolean;
} & WidgetWrapperProps &
  ItemGrid0Props &
  Omit<HeadlineProps, 'classes'>;

export type SvelteWidgetTestimonialsProps = {
  items?: Testimonial[];
  callToAction?: ToAction;
  isAfterContent?: boolean;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
} & SvelteWidgetWrapperProps &
  ItemGrid0Props &
  Omit<HeadlineProps, 'classes'>;
