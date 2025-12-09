import type { Image } from '~/types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type ImageGalleryProps = {
  /** Single image or array of images. If array has >1 items, gallery mode is enabled. */
  image?: Image | Image[] | string;
  /** CSS classes for the image element */
  imageClass?: string;
  /** Image layout mode */
  imageLayout?: 'fixed' | 'constrained' | 'fullWidth' | 'cover' | 'responsive' | 'contained';
  /** Image widths for srcset */
  widths?: number[];
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** Image sizes attribute */
  sizes?: string;
  /** Whether to add hover scale effect */
  hoverEffect?: boolean;
  /** Additional class for the container */
  class?: string;
};

export type SvelteImageGalleryProps = WithElementRef<HTMLAttributes<HTMLDivElement>> &
  ImageGalleryProps & {
    ref?: HTMLDivElement | null;
    /** Slot for badge at bottom right */
    badgeBottomRight?: Snippet;
    /** Slot for badge at bottom left */
    badgeBottomLeft?: Snippet;
  };
