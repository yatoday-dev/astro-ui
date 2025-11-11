import type { ButtonSize, ButtonVariant } from '~/components/Button/theme-variants.ts';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import type { HTMLAttributes } from 'astro/types';

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text?: string;
  icon?: string;
  class?: string;
  type?: 'button' | 'submit' | 'reset';
} & Partial<HTMLAttributes<'a'>> & Partial<HTMLAttributes<'button'>>;

export type SvelteButtonProps = WithElementRef<HTMLButtonAttributes> &
  WithElementRef<HTMLAnchorAttributes> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    text?: string;
  };
