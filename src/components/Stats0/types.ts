import type { Item } from '../../types';
import type { Snippet } from 'svelte';

export type Stats0Props = {
  items: Item[];
  classes?: Record<string, string>;
};

export type SvelteStats0Props = Stats0Props & {
  iconSlots?: Record<string, Snippet>;
};
