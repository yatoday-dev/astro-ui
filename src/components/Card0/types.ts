import type { HTMLTag } from 'astro/types';
import type { Image } from '../../types';

export type Card0Props = {
  /** Single image, array of images for gallery, or HTML string */
  image?: Image | Image[] | string;
  widths?: number[];
  size?: number;
  sizes?: string;
  content?: string;
  ['as']?: HTMLTag;
  badge?: string;
  badgeTopRight?: string;
  badgeBottomRight?: string;
  badgeBottomLeft?: string;
  classes?: Record<string, string>;
};
