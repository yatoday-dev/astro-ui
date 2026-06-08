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
  /**
   * Optional one-line supporting text. In a mega panel, leaf items with a
   * `description` render Stripe-style: an icon tile, a bold title, and this
   * muted subtitle beneath it. Ignored by regular dropdowns.
   */
  description?: string;
}

export interface IMenuLink extends ILink {
  links?: IMenuLink[];
  /**
   * When true on a top-level item, its `links` are rendered as a full-width
   * multi-column mega panel: each child becomes a column whose `text`/`href`
   * is the column heading and whose nested `links` are the column items.
   * Defaults to a standard single-column dropdown.
   */
  mega?: boolean;
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
