import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction, Image } from '../../types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type Card5Props = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  author?: string;
  authorDescription?: string;
  icon?: string;
  image?: string | Image;
  callToAction?: ToAction;
} & Card0Props;

export type SvelteCard5Props = WithElementRef<HTMLAttributes<HTMLElement>> &
  Omit<Card5Props, 'image'> & {
    ref?: HTMLElement | null;
    children?: Snippet;
    image?: Snippet | Image | string;
    iconSlot?: Snippet;
  };
