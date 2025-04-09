import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction } from '../../types';

export type Card4Props = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  icon?: string;
  callToAction?: string | ToAction | Array<string | ToAction>;
} & Card0Props;
