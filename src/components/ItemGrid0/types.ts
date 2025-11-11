import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type ItemGrid0Props = {
  class?: string;
  columns?: number;
};

export type SvelteItemGrid0Props = WithElementRef<HTMLAttributes<HTMLDivElement>> &
  ItemGrid0Props & {
    ref?: HTMLDivElement | null;
    children?: Snippet;
  };
