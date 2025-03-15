import type { WithElementRef } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLButtonAttributes, MouseEventHandler } from 'svelte/elements';

export type ButtonProps = {
  variant?: 'default' | 'primary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  text?: string;
  class?: string;
  [key: string]: any;
};
