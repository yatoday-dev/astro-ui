import type { HTMLTag } from 'astro/types';
import type { ImageProps } from '../../utils/images-optimization.ts';

export type Card0Props = {
  image?: ImageProps | string;
  content?: string;
  as?: HTMLTag;
  classes?: Record<string, string>;
};
