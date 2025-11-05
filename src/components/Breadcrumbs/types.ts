import type { BreadcrumbsItemProps } from '../BreadcrumbsItem/types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type BreadcrumbsProps = {
  class?: string;
  children?: BreadcrumbsItemProps | BreadcrumbsItemProps[];
  items?: BreadcrumbsItemProps[];
  ariaLabel?: string;
};

export type SvelteBreadcrumbsProps = WithElementRef<HTMLAttributes<HTMLElement>> &
  BreadcrumbsProps & {
    ref?: HTMLElement | null;
    children?: Snippet;
  };
