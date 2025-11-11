import type { Image, ToAction } from '../../types';
import type { WidgetWrapperProps } from '~/components/WidgetWrapper/types.ts';
import type { HeadlineProps } from '~/components/Headline/types.ts';
import type { Snippet } from 'svelte';

export type WidgetHero2Props = {
  position?: 'center' | 'left' | 'right';
  content?: string;
  actions?: string | ToAction[];
  image?: string | Image;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;

export type SvelteWidgetHero2Props = WidgetHero2Props & {
  contentSlot?: Snippet;
  actionsSlot?: Snippet;
  imageSlot?: Snippet;
  bgSlot?: Snippet;
};
