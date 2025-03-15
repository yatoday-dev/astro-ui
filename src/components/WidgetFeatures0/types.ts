import type { HeadlineProps } from '../Headline/types';
import type { WidgetWrapperProps } from '../WidgetWrapper/types.ts';

export type WidgetFeatures0Props = {
  isBeforeContent?: boolean;
  isAfterContent?: boolean;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
