import type { Snippet } from 'svelte';

export type BackgroundProps = {
  isDark?: boolean;
};

export type SvelteBackgroundProps = {
  children?: Snippet;
} & BackgroundProps;
