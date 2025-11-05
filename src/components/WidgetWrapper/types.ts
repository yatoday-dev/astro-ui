import type { HTMLTag } from 'astro/types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type WidgetWrapperProps = {
  class?: string;
  containerClass?: string;
  ['as']?: HTMLTag;
  id?: string;
  isDark?: boolean;
  isAfterContent?: boolean;
  bg?: string;
  classes?: Record<string, string | Record<string, string>>;
};

export type SvelteWidgetWrapperProps = WithElementRef<HTMLAttributes<HTMLElement>> &
  WidgetWrapperProps & {
    ref?: HTMLElement | null;
    children?: Snippet;
    bg?: Snippet;
  };
