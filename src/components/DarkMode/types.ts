import type { Snippet } from 'svelte';
import type { WithElementRef } from 'bits-ui';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type DarkModeProps = {
  label?: string;
  class?: string;
  iconClass?: string;
  iconName?: string;
  initialMode?: 'system' | 'light' | 'dark' | 'light:only' | 'dark:only';
};

export type SvelteDarkModeProps = WithElementRef<HTMLButtonAttributes> &
  DarkModeProps & {
    ref?: HTMLButtonElement | null;
    children?: Snippet;
  };
