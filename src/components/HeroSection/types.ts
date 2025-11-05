import type { HTMLTag } from 'astro/types';
import type { ToAction, Image } from '../../types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type HeroSectionProps = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  image: Image | string;
  callToAction?: string | ToAction | Array<string | ToAction>;
  classes?: Record<string, string>;
};

export type SvelteHeroSectionProps = WithElementRef<HTMLAttributes<HTMLDivElement>> &
  Omit<HeroSectionProps, 'image'> & {
    ref?: HTMLDivElement | null;
    children?: Snippet;
    image?: Snippet | Image | string;
  };
