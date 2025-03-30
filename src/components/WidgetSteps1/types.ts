import type { Link, Stat, ToAction } from '~/types';
import type { WidgetFeatures0Props } from '~/components/WidgetFeatures0/types.ts';
import type { HeadlineProps } from '~/components/Headline/types.ts';

export type WidgetSteps1Props = {
  callToAction?: ToAction;
  isReversed?: boolean;
  items?: {
    title?: string;
    description?: string;
    icon?: string;
    href?: string;
    classes?: Record<string, string>;
  }[];
} & WidgetFeatures0Props &
  HeadlineProps;
