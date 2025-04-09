import type { WidgetWrapperProps } from '../WidgetWrapper/types';

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
}

export interface ILinks {
  title?: string;
  links: Array<ILink>;
}
