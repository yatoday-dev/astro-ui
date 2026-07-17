import type { Image } from '../../types';
import type { Snippet } from 'svelte';

export type ImageGalleryThumbsProps = {
  id?: string;
  height?: string;
  withNavigation?: boolean;
  withFullscreen?: boolean;
  withCounter?: boolean;
  classes?: Record<string, string>;
  images?: Image[];
};

export type SvelteImageGalleryThumbsProps = ImageGalleryThumbsProps & {
  ref?: HTMLElement | null;
  children?: Snippet;
};
