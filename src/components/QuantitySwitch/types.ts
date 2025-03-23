import type {Size, Variant} from "~/components/QuantitySwitch/theme-variants.ts";

export type QuantitySwitchProps = {
  variant?: Variant;
  size?: Size;
  value?: number;
} & HTMLButtonElement;

export type SvelteQuantitySwitchProps = {
  class?: string;
} & QuantitySwitchProps
