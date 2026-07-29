import type { BreadcrumbsItemProps } from '../BreadcrumbsItem/types';
import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

/**
 * Item shape for the `items` array API. `position` is optional here because the
 * array index supplies it; `icon` names an icon rendered in place of the label.
 */
export type BreadcrumbsItemData = Omit<BreadcrumbsItemProps, 'position'> & {
  position?: number;
  icon?: string;
};

export type BreadcrumbsProps = {
  class?: string;
  children?: BreadcrumbsItemProps | BreadcrumbsItemProps[];
  items?: BreadcrumbsItemData[];
  ariaLabel?: string;
};

export type SvelteBreadcrumbsProps = WithElementRef<HTMLAttributes<HTMLElement>> &
  BreadcrumbsProps & {
    ref?: HTMLElement | null;
    children?: Snippet;
    /** Per-item icon snippets keyed `icon-${index}`, matching the `items` order. */
    iconSlots?: Record<string, Snippet>;
  };
