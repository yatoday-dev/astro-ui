import type { BreadcrumbsItemProps } from '../BreadcrumbsItem/types';

export type BreadcrumbsProps = {
  class?: string;
  children: BreadcrumbsItemProps | BreadcrumbsItemProps[];
  items: BreadcrumbsItemProps[];
  ariaLabel?: string;
};
