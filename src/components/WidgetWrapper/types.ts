import type { HTMLTag } from 'astro/types';

export type WidgetWrapperProps = {
  containerClass?: string;
  ['as']?: HTMLTag;
  id?: string;
  isDark?: boolean;
  bg?: string;
  classes?: Record<string, string | Record<string, string>>;
};
