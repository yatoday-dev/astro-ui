import type { ToAction } from '../../types';
import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types.ts';
import type { Snippet } from 'svelte';

export type WidgetNavbarProps = {
  links?: IMenuLink[];
  actions?: ToAction[];
  isSticky?: boolean;
  isDark?: boolean;
  showToggleTheme?: boolean;
  initialMode?: 'light' | 'dark' | 'system' | 'light:only' | 'dark:only';
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

export type SvelteWidgetNavbarProps = {
  links?: IMenuLink[];
  actions?: ToAction[];
  isSticky?: boolean;
  isDark?: boolean;
  showToggleTheme?: boolean;
  position?: 'center' | 'left' | 'right';
  classes?: Record<string, string>;
  scrollOffset?: number;
  pinnedClasses?: string;
  logo?: Snippet;
  toggleMenu?: Snippet;
  actionsSlot?: Snippet;
  bg?: Snippet;
} & SvelteWidgetWrapperProps;
