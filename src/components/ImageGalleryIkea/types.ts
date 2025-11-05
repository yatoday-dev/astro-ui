import type { Image } from '../../types';
import type { Snippet } from 'svelte';

export type ImageGalleryIkeaProps = {
  id?: string;
  height?: string;
  withNavigation?: boolean;
  classes?: Record<string, string>;
  images?: Image[];
};

export type SvelteImageGalleryIkeaProps = {
  id?: string;
  height?: string;
  withNavigation?: boolean;
  classes?: Record<string, string>;
  images?: Image[];
  ref?: HTMLElement | null;
  children?: Snippet;
};
