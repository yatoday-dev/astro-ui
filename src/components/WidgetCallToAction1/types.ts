import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type {ToAction} from "../../types";

export type WidgetCallToAction1Props = {
  actions?: ToAction[];
} & WidgetWrapperProps & Omit<HeadlineProps, 'classes'>;
