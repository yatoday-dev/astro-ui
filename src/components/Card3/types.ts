import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction } from '../../types';

export type Card3Props = {
  title?: string;
  description?: string;
  asHeader?: HTMLTag;
  badge?: string;
  callToAction?: string | ToAction[] | Array<string | ToAction>;
} & Card0Props;
