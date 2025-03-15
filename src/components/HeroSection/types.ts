import type { HTMLTag } from 'astro/types';
import type { ImageProps } from '../Image/types';
import type { ICallToAction } from '../CallToAction/types';

export type HeroSectionProps = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  image: ImageProps | string;
  callToAction?: ICallToAction;
  classes?: Record<string, string>;
};
