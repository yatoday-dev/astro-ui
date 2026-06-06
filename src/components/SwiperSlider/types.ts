import type { Snippet } from 'svelte';

export type SwiperSliderProps = {
  id?: string;
  withNavigation?: boolean;
  classes?: Record<string, string>;
  /**
   * Swiper `breakpoints` config, passed through to <swiper-container> as a
   * JSON string. Overrides the component's default responsive breakpoints.
   */
  breakpoints?: string;
};

export type SvelteSwiperSliderProps = {
  id?: string;
  withNavigation?: boolean;
  classes?: Record<string, string>;
  breakpoints?: string;
  children?: Snippet;
};
