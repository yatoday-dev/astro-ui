import type { HTMLTag } from 'astro/types';

export type HeadlineProps = {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: Record<string, string>;
  ['as']?: HTMLTag;
  position?: 'center' | 'left' | 'right';
};
