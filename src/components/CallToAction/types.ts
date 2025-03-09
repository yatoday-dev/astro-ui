import type {HTMLAttributes} from "astro/types";
import type {WidgetWrapperProps} from "../WidgetWrapper/types";

export type CallToActionProps = {
  title?: string;
  subtitle?: string;
  tagline?: string;
  callToAction?: ICallToAction;
  actions?: string | ICallToAction[];
} & WidgetWrapperProps

export interface ICallToAction extends Omit<HTMLAttributes<'a'>, 'slot'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon';
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
}
