import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { ItemGrid0Props } from '../ItemGrid0/types';
import type { Card4Props } from '../Card4/types';

export type WidgetFaq1Props = {
  items?: Card4Props[];
} & WidgetWrapperProps &
  ItemGrid0Props &
  Omit<HeadlineProps, 'classes'>;
