import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeroSectionProps } from '../HeroSection/types';

export type WidgetHeroSliderProps = {
  items?: HeroSectionProps[];
  height?: string;
  isAfterContent?: boolean;
  withPagination?: boolean;
  withNavigation?: boolean;
} & WidgetWrapperProps;

export type SvelteWidgetHeroSliderProps = {
  items?: HeroSectionProps[];
  height?: string;
  isAfterContent?: boolean;
  withPagination?: boolean;
  withNavigation?: boolean;
} & SvelteWidgetWrapperProps;
