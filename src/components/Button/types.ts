import type {ButtonSize, ButtonVariant} from "~/components/Button/theme-variants.ts";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text?: string;
  class?: string;
  [key: string]: any;
};
