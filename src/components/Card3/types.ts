import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction, Image } from '../../types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type Card3Props = {
  title?: string;
  description?: string;
  asHeader?: HTMLTag;
  badge?: string;
  callToAction?: string | ToAction | Array<string | ToAction>;
} & Card0Props;

export type SvelteCard3Props = WithElementRef<HTMLAttributes<HTMLElement>> &
  Omit<Card3Props, 'image'> & {
    ref?: HTMLElement | null;
    children?: Snippet;
    /** Single image, array of images for gallery, Snippet, or HTML string */
    image?: Snippet | Image | Image[] | string;
    badgeTopRightSlot?: Snippet;
    badgeBottomRightSlot?: Snippet;
    badgeBottomLeftSlot?: Snippet;
    footerSlot?: Snippet;
  };
