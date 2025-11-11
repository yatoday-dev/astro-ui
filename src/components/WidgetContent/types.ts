import type {Item, HotspotPoint, ToAction} from '../../types';
import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types.ts';
import type { Snippet } from 'svelte';

export type WidgetContentProps = {
  content?: string;
  defaultIcon?: string;
  image?: string | unknown;
  items?: Array<Item>;
  points?: Array<HotspotPoint>;
  pointsDisplayMode?: 'always' | 'hover' | undefined; // controls visibility of hotspot points
  columns?: number;
  isReversed?: boolean;
  isAfterContent?: boolean;
  callToAction?: ToAction;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;

export type SvelteWidgetContentProps = {
  content?: string | Snippet;
  defaultIcon?: string;
  image?: string | unknown | Snippet;
  items?: Array<Item>;
  points?: Array<HotspotPoint>;
  pointsDisplayMode?: 'always' | 'hover' | undefined;
  columns?: number;
  isReversed?: boolean;
  isAfterContent?: boolean;
  callToAction?: ToAction;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
  children?: Snippet;
} & SvelteWidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
