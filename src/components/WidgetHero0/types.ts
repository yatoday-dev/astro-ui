import type { WidgetFeatures0Props } from '~/components/WidgetFeatures0/types.ts';
import type { Link, Item, ToAction, Image } from '../../types';
import type { Snippet } from 'svelte';

export type WidgetHero0Props = {
  links?: Link[];
  stats?: Item[];
  actions?: ToAction[];
  title?: string;
  description?: string;
  tagline?: string;
  image?: Image | string;
  position?: 'center' | 'left' | 'right';
} & WidgetFeatures0Props;

export type SvelteWidgetHero0Props = WidgetHero0Props & {
  children?: Snippet;
  bgSlot?: Snippet;
};
