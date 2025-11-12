import type { Image, ToAction } from '../../types';
import type { WidgetWrapperProps } from '~/components/WidgetWrapper/types.ts';
import type { HeadlineProps } from '~/components/Headline/types.ts';
import type { Snippet } from 'svelte';

export type WidgetHero2Props = {
  position?: 'center' | 'left' | 'right';
  content?: string;
  actions?: string | ToAction[];
  image?: string | Image;
  asHeader?: HeadlineProps['as'];
  asSubtitle?: HeadlineProps['asSubtitle'];
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes' | 'as' | 'asSubtitle'>;

export type SvelteWidgetHero2Props = Omit<WidgetHero2Props, 'asSubtitle'> & {
  contentSlot?: Snippet;
  actionsSlot?: Snippet;
  imageSlot?: Snippet;
  bgSlot?: Snippet;
  asSubtitle?: HeadlineProps['asSubtitle'];
};
