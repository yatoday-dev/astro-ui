import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { ToAction } from '../../types';
import type { Snippet } from 'svelte';

export type CallToActionProps = {
  title?: string;
  subtitle?: string;
  tagline?: string;
  callToAction?: string | ToAction | Array<string | ToAction>;
} & WidgetWrapperProps;

export type SvelteCallToActionProps = Omit<SvelteWidgetWrapperProps, 'bg'> & {
  title?: string;
  subtitle?: string;
  tagline?: string;
  callToAction?: string | ToAction | Array<string | ToAction>;
  bg?: Snippet;
};
