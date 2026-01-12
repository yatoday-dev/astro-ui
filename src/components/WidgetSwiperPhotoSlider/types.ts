import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { ToAction, Image } from '../../types';
import type { Snippet } from 'svelte';

export type WidgetSwiperPhotoSliderProps = {
  isAfterContent?: boolean;
  withNavigation?: boolean;
  imagesFolder: string;
  alt?: string;
  classes?: {
    container?: string;
    headline?: Record<string, string>;
    image?: string;
  };
  callToAction?: ToAction;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;

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
