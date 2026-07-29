// Utility Types
import type { HTMLAttributes } from 'astro/types';
import type { ImageMetadata } from 'astro';

export type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export type ToAction = {
  variant?: 'default' | 'primary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
} & Omit<HTMLAttributes<'a'>, 'slot'>;

export type Link = {
  href?: string;
  text?: string;
};

export type NameValue = {
  name?: string;
  value?: string;
};

export type HotspotPoint = {
  x: number; // percentage from the left (0-100)
  y: number; // percentage from top (0-100)
  title: string;
  description: string;
  isPopupOpen?: boolean; // whether the popup is open on initialization
  classes?: Record<string, string>;
  callToAction?: CallToAction;
};

export type Item = {
  title?: string;
  description?: string;
  icon?: string;
  classes?: Record<string, string>;
  callToAction?: CallToAction;
  image?: Image | string;
  href?: string;
};

export type Image = {
  src: string;
  alt?: string;
  aspectRatio?: string;
  class?: string;
} & Omit<HTMLAttributes<'img'>, 'src'> & {
    src?: string | ImageMetadata | null;
    width?: string | number | null;
    height?: string | number | null;
    alt?: string | null;
    loading?: 'eager' | 'lazy' | null;
    decoding?: 'sync' | 'async' | 'auto' | null;
    class?: string;
    style?: string;
    srcset?: string | null;
    sizes?: string | null;
    fetchpriority?: 'high' | 'low' | 'auto' | null;
    layout?: Layout;
    widths?: number[] | null;
    aspectRatio?: string | number | null;
    objectPosition?: string;
    format?: string;
  };

export type Testimonial = {
  title?: string;
  description?: string;
  author?: string;
  authorDescription?: string;
  image?: string | Image;
  callToAction?: ToAction;
};

// The util re-exports are appended at build time from src/utils/, mirroring the
// runtime barrel in dist/index.js — see scripts/build.js.
