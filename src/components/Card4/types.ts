import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction } from '../../types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type Card4Props = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  icon?: string;
  callToAction?: string | ToAction | Array<string | ToAction>;
} & Card0Props;

export type SvelteCard4Props = WithElementRef<HTMLAttributes<HTMLElement>> &
  Card4Props & {
    ref?: HTMLElement | null;
    children?: Snippet;
    iconSlot?: Snippet;
    footerSlot?: Snippet;
  };
