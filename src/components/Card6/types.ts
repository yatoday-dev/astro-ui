import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction, Image } from '../../types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type Card6Props = {
  title?: string;
  description?: string;
  asHeader?: HTMLTag;
  badge?: string;
  callToAction?: string | ToAction | Array<string | ToAction>;
  widths?: number[];
  size?: number;
  sizes?: string;
} & Card0Props;

export type SvelteCard6Props = WithElementRef<HTMLAttributes<HTMLElement>> &
  Omit<Card6Props, 'image'> & {
    ref?: HTMLElement | null;
    children?: Snippet;
    image?: Snippet | Image | string;
    badgeTopRightSlot?: Snippet;
    badgeBottomRightSlot?: Snippet;
    badgeBottomLeftSlot?: Snippet;
  };
