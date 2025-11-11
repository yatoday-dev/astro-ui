import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction } from '../../types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type Card7Props = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  icon?: string;
  callToAction?: ToAction;
} & Card0Props;

export type SvelteCard7Props = WithElementRef<HTMLAttributes<HTMLElement>> &
  Card7Props & {
    ref?: HTMLElement | null;
    children?: Snippet;
    iconSlot?: Snippet;
  };
