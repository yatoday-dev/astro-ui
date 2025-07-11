import type {Item, HotspotPoint, ToAction} from '../../types';
import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types.ts';

export type WidgetContentProps = {
  content?: string;
  defaultIcon?: string;
  image?: string | unknown;
  items?: Array<Item>;
  points?: Array<HotspotPoint>;
  pointsDisplayMode?: 'always' | 'hover' | undefined; // controls visibility of hotspot points
  columns?: number;
  isReversed?: boolean;
  isAfterContent?: boolean;
  callToAction?: ToAction;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
