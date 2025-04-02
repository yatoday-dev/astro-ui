import type { Item } from '../../types';

export type TimelineProps = {
  items?: Array<Item>;
  defaultIcon?: string;
  classes?: Record<string, string>;
};
