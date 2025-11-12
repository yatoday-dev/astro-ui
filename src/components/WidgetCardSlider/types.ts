import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Card1Props } from '../Card1/types';
import type { Card2Props } from '../Card2/types';
import type { Card3Props } from '../Card3/types';
import type { Snippet } from 'svelte';

export type WidgetCardSliderProps = {
  via?: any;
  items?: Card1Props[] | Card2Props[] | Card3Props[];
  isAfterContent?: boolean;
  withNavigation?: boolean;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;

export type SvelteWidgetCardSliderProps = {
  via?: any;
  items?: Card1Props[] | Card2Props[] | Card3Props[];
  isAfterContent?: boolean;
  withNavigation?: boolean;
  title?: string | Snippet;
  subtitle?: string | Snippet;
  tagline?: string | Snippet;
  bg?: Snippet;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & SvelteWidgetWrapperProps &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;
