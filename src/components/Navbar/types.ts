import type { ToAction } from '../../types';

export type NavbarProps = {
  links?: IMenuLink[];
  actions?: ToAction[];
  isSticky?: boolean;
  isDark?: boolean;
  showToggleTheme?: boolean;
  position?: 'center' | 'left' | 'right';
  classes?: Record<string, string>;
  scrollOffset?: number;
  pinnedClasses?: string;
};

export interface ILink {
  text?: string;
  href?: string;
  ariaLabel?: string;
  icon?: string;
}

export interface IMenuLink extends ILink {
  links?: IMenuLink[];
}
