import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Item, ToAction } from '../../types';

export type WidgetStatsProps = {
  via?: any;
  items?: Item[];
  callToAction?: ToAction;
  isAfterContent?: boolean;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
