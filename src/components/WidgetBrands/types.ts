import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Image } from '~/types';

export type WidgetBrandsProps = {
  icons?: Array<string>;
  images?: Array<Image>;
  isAfterContent?: boolean;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
