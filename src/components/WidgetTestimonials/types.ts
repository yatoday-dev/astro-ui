import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Testimonial, ToAction } from '../../types';
import type { ItemGrid0Props } from '../ItemGrid0/types.ts';

export type WidgetTestimonialsProps = {
  items?: Testimonial[];
  callToAction?: ToAction;
  isAfterContent?: boolean;
} & WidgetWrapperProps &
  ItemGrid0Props &
  Omit<HeadlineProps, 'classes'>;
