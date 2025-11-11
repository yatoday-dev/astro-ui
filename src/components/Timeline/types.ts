import type { Item } from '../../types';
import type { Snippet } from 'svelte';

export type TimelineProps = {
  items?: Array<Item>;
  defaultIcon?: string;
  classes?: Record<string, string>;
};

export type SvelteTimelineProps = TimelineProps & {
  iconSlots?: Record<string, Snippet>;
  defaultIconSlot?: Snippet;
};
