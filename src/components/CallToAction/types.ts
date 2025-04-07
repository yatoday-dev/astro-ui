import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { ToAction } from '../../types';

export type CallToActionProps = {
  title?: string;
  subtitle?: string;
  tagline?: string;
  callToAction?: string | ToAction[] | Array<string | ToAction>;
} & WidgetWrapperProps;
