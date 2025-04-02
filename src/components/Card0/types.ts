import type { HTMLTag } from 'astro/types';
import type { Image } from '../../types';

export type Card0Props = {
  image?: Image | string;
  content?: string;
  ['as']?: HTMLTag;
  badge?: string;
  classes?: Record<string, string>;
};
