import type {ButtonSize, ButtonVariant} from "~/components/Button/theme-variants.ts";
import type {WithElementRef} from "bits-ui";
import type {HTMLAnchorAttributes, HTMLButtonAttributes} from "svelte/elements";


export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text?: string;
  class?: string;
  [key: string]: any;
};

export type SvelteButtonProps = WithElementRef<HTMLButtonAttributes> &
  WithElementRef<HTMLAnchorAttributes> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text?: string;
};
