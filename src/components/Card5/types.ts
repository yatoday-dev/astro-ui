import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction, Image } from '../../types';

export type Card5Props = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  author?: string;
  authorDescription?: string;
  icon?: string;
  image?: string | Image;
  callToAction?: ToAction;
} & Card0Props;
