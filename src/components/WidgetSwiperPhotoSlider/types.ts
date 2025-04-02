import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';

export type WidgetSwiperPhotoSliderProps = {
  isAfterContent?: boolean;
  withNavigation?: boolean;
  imagesFolder: string;
  classes?: Record<string, string>;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
