import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type {ToAction} from "../../types";

export type WidgetSwiperPhotoSliderProps = {
  isAfterContent?: boolean;
  withNavigation?: boolean;
  imagesFolder: string;
  classes?: {
    container?: string;
    headline?: Record<string, string>;
  };
  callToAction?: ToAction;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;
