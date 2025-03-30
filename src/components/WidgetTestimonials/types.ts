import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Image, ToAction } from '../../types';
import type { ItemGrid0Props } from '../ItemGrid0/types.ts';

export type WidgetTestimonialsProps = {
  items?: Testimonial[];
  callToAction?: ToAction;
} & WidgetWrapperProps &
  ItemGrid0Props &
  Omit<HeadlineProps, 'classes'>;

export type Testimonial = {
  title?: string;
  text?: string;
  author?: string;
  authorDescription?: string;
  image?: string | Image;
  callToAction?: ToAction;
};
