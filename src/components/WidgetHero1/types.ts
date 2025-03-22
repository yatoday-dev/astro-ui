import type { WidgetFeatures0Props } from '~/components/WidgetFeatures0/types.ts';
import type { ImageProps } from '../../utils/images-optimization.ts';
import type { Link, Stat, ToAction } from '../../types';

export type WidgetHero1Props = {
  links?: Link[];
  stats?: Stat[];
  actions?: ToAction[];
  title?: string;
  description?: string;
  tagline?: string;
  image?: ImageProps | string;
  position?: 'center' | 'left' | 'right';
} & WidgetFeatures0Props;
