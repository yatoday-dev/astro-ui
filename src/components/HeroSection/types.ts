import type { HTMLTag } from 'astro/types';
import type { ImageProps } from '../Image/types';
import type { ToAction } from '../../types';

export type HeroSectionProps = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  image: ImageProps | string;
  callToAction?: ToAction;
  classes?: Record<string, string>;
};
