import type { ToAction } from '../../types';
import type { WidgetWrapperProps } from '../WidgetWrapper/types.ts';

export type WidgetNavbarProps = {
  links?: IMenuLink[];
  actions?: ToAction[];
  isSticky?: boolean;
  isDark?: boolean;
  showToggleTheme?: boolean;
  position?: 'center' | 'left' | 'right';
  classes?: Record<string, string>;
  scrollOffset?: number;
  pinnedClasses?: string;
} & WidgetWrapperProps;

export interface ILink {
  text?: string;
  href?: string;
  ariaLabel?: string;
  icon?: string;
}

export interface IMenuLink extends ILink {
  links?: IMenuLink[];
}
