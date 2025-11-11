import type { Snippet } from 'svelte';

export type BackToTopButtonProps = {
  selector?: string;
  scrollOffset?: number;
};

export type SvelteBackToTopButtonProps = BackToTopButtonProps & {
  iconSlot?: Snippet;
};
