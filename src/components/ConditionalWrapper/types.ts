import type { Snippet } from 'svelte';

export type ConditionalWrapperProps = {
  condition: boolean;
  [key: string]: any;
};

export type SvelteConditionalWrapperProps = {
  children: Snippet;
} & ConditionalWrapperProps;
