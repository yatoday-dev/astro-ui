import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction, Image } from '~/types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type Card2Props = {
  title?: string;
  description?: string;
  icon?: string;
  asHeader?: HTMLTag;
  badge?: string;
  url?: string;
  callToAction?: ToAction;
  /** Array of images for multi-image hover gallery. When provided, hovering over different sections of the card switches between images. */
  images?: Image[];
} & Card0Props;

export type SvelteCard2Props = WithElementRef<HTMLAttributes<HTMLElement>> &
  Omit<Card2Props, 'image'> & {
    ref?: HTMLElement | null;
    children?: Snippet;
    image?: Snippet | Image | string;
    /** Array of images for multi-image hover gallery */
    images?: Image[];
    iconSlot?: Snippet;
    badgeTopRightSlot?: Snippet;
    badgeBottomRightSlot?: Snippet;
    badgeBottomLeftSlot?: Snippet;
  };
