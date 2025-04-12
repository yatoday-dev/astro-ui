import type { HTMLTag } from 'astro/types';
import type { ToAction, Image } from '../../types';

export type HeroSectionProps = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  image: Image | string;
  callToAction?: string | ToAction | Array<string | ToAction>;
  classes?: Record<string, string>;
};
