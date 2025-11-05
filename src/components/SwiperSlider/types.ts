import type { Snippet } from 'svelte';

export type SwiperSliderProps = {
  id?: string;
  withNavigation?: boolean;
  classes?: Record<string, string>;
};

export type SvelteSwiperSliderProps = {
  id?: string;
  withNavigation?: boolean;
  classes?: Record<string, string>;
  children?: Snippet;
};
