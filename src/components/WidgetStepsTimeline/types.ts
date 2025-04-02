import type { Item, Image } from '../../types';
import type { WidgetFeatures0Props } from '../WidgetFeatures0/types.ts';
import type { HeadlineProps } from '../Headline/types.ts';

export type WidgetStepsTimelineProps = {
  isReversed?: boolean;
  items?: Item[];
  image?: string | Image;
  defaultIcon?: string;
  isAfterContent?: boolean;
} & WidgetFeatures0Props &
  HeadlineProps;
