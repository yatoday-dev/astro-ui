import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction, Link, NameValue, Image } from '../../types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type Card1Props = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  icon?: string;
  callToAction?: string | ToAction | Array<string | ToAction>;
  data?: NameValue[];
  links?: Link[];
  badge?: string;
} & Card0Props;

export type SvelteCard1Props = WithElementRef<HTMLAttributes<HTMLElement>> &
  Omit<Card1Props, 'image'> & {
    ref?: HTMLElement | null;
    children?: Snippet;
    /** Single image, array of images for gallery, Snippet, or HTML string */
    image?: Snippet | Image | Image[] | string;
    iconSlot?: Snippet;
    badgeSlot?: Snippet;
    badgeTopRightSlot?: Snippet;
    badgeBottomRightSlot?: Snippet;
    badgeBottomLeftSlot?: Snippet;
    footerSlot?: Snippet;
  };
