import type { WithElementRef } from 'bits-ui';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { ButtonSize, ButtonVariant } from '../Button/theme-variants.ts';

export type CopyToClipboardProps = WithElementRef<HTMLButtonAttributes> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text?: string;
  class?: string;
};
