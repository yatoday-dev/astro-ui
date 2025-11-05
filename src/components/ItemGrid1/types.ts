import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type ItemGrid1Props = {
  class?: string;
};

export type SvelteItemGrid1Props = WithElementRef<HTMLAttributes<HTMLDivElement>> &
  ItemGrid1Props & {
    ref?: HTMLDivElement | null;
    children?: Snippet;
  };
