import type { HTMLTag } from 'astro/types';
import type { Snippet } from 'svelte';

export type ImageProps = {
  src: string;
  alt?: string;
  aspectRatio?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'eager' | 'lazy';
  decoding?: 'sync' | 'async' | 'auto';
  class?: string;
  layout?: 'fixed' | 'constrained' | 'fullWidth' | 'cover' | 'responsive' | 'contained';
};

export type SvelteImageProps = ImageProps & {
  ref?: HTMLImageElement | null;
};
