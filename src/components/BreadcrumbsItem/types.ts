import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLLiAttributes } from 'svelte/elements';

export type BreadcrumbsItemProps = {
  href?: string;
  label: string | number;
  currentPage?: boolean;
  hasIcon?: boolean;
  class?: string;
  position?: number;
};

export type SvelteBreadcrumbsItemProps = WithElementRef<HTMLLiAttributes> &
  BreadcrumbsItemProps & {
    ref?: HTMLLIElement | null;
    icon?: Snippet;
    separator?: Snippet;
  };
