import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ICallToAction } from '../CallToAction/types';

export type Card3Props = {
  title?: string;
  description?: string;
  asHeader?: HTMLTag;
  badge?: string;
  callToAction?: ICallToAction;
} & Card0Props;
