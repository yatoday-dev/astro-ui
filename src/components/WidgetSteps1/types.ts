import type { Item, ToAction } from '../../types';
import type { WidgetFeatures0Props } from '../WidgetFeatures0/types.ts';
import type { HeadlineProps } from '../Headline/types.ts';

export type WidgetSteps1Props = {
  callToAction?: ToAction;
  isReversed?: boolean;
  isAfterContent?: boolean;
  items?: Item[];
} & WidgetFeatures0Props &
  HeadlineProps;
