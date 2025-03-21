import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';

export type Card2Props = {
  title?: string;
  description?: string;
  icon?: string;
  asHeader?: HTMLTag;
  badge?: string;
  url?: string;
} & Card0Props;
