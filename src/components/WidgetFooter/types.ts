import type { WidgetWrapperProps, SvelteWidgetWrapperProps } from '../WidgetWrapper/types';
import type { Snippet } from 'svelte';

export type WidgetFooterProps = {
  links: Array<ILinks>;
  secondaryLinks: Array<ILink>;
  socialLinks: Array<ILink>;
  note?: string;
  theme?: 'dark' | 'light';
} & WidgetWrapperProps;

export interface ILink {
  text?: string;
  href?: string;
  ariaLabel?: string;
  icon?: string;
  /** Inline onclick handler for special links like cookie settings */
  onclick?: string;
}

export interface ILinks {
  title?: string;
  links: Array<ILink>;
}

export type SvelteWidgetFooterProps = {
  links?: Array<ILinks>;
  secondaryLinks?: Array<ILink>;
  socialLinks?: Array<ILink>;
  note?: string;
  theme?: 'dark' | 'light';
  logo?: Snippet;
  subscribe?: Snippet;
  bg?: Snippet;
} & SvelteWidgetWrapperProps;
