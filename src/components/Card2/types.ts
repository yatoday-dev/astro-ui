import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction } from '~/types';

export type Card2Props = {
  title?: string;
  description?: string;
  icon?: string;
  asHeader?: HTMLTag;
  badge?: string;
  url?: string;
  callToAction?: ToAction;
} & Card0Props;
