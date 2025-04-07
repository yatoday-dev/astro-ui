import type { HeadlineProps } from '../Headline/types';
import type { WidgetWrapperProps } from '../WidgetWrapper/types.ts';
import type { ToAction } from '~/types';

export type WidgetFeatures0Props = {
  isBeforeContent?: boolean;
  isAfterContent?: boolean;
  callToAction: string | ToAction | Array<string | ToAction>;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
