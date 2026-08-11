import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { SwiperSliderProps } from '../SwiperSlider/types';
import type { ToAction, Image } from '../../types';
import type { Snippet } from 'svelte';

export type WidgetSwiperPhotoSliderProps = {
  isAfterContent?: boolean;
  withNavigation?: boolean;
  imagesFolder: string;
  alt?: string;
  /** Per-image alt text, keyed by filename with or without extension (e.g. `project-01` or `project-01.jpg`). Takes priority over `alt`. */
  alts?: Record<string, string>;
  classes?: {
    container?: string;
    headline?: Record<string, string>;
    /** Classes for the slide link. Use it to override the default `aspect-square` crop. */
    link?: string;
    image?: string;
  };
  callToAction?: ToAction;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'> &
  /* Everything not consumed here is spread onto the inner SwiperSlider */
  Omit<SwiperSliderProps, 'id' | 'withNavigation' | 'classes'>;

export type SvelteWidgetSwiperPhotoSliderProps = {
  isAfterContent?: boolean;
  withNavigation?: boolean;
  images?: Image[];
  classes?: Record<string, string>;
  callToAction?: ToAction;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  position?: 'center' | 'left' | 'right';
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & SvelteWidgetWrapperProps;
