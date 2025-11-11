import type { HeadlineProps } from '../Headline/types';
import type { WidgetWrapperProps } from '../WidgetWrapper/types.ts';
import type { ToAction } from '~/types';
import type { Snippet } from 'svelte';

export type WidgetFeatures0Props = {
  isBeforeContent?: boolean;
  isAfterContent?: boolean;
  callToAction?: string | ToAction | Array<string | ToAction>;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;

export type SvelteWidgetFeatures0Props = WidgetFeatures0Props & {
  children?: Snippet;
  bgSlot?: Snippet;
};
