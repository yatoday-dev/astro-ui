import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { ToAction } from '../../types';

export type CallToActionProps = {
  title?: string;
  subtitle?: string;
  tagline?: string;
  callToAction?: ToAction;
  actions?: string | ToAction[];
} & WidgetWrapperProps;
