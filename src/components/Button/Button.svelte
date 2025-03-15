<script lang="ts" module>
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

  import type { WithElementRef } from 'bits-ui';
  import type {ButtonSize, ButtonVariant} from "./button-variants.ts";

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    text?: string;
  };
</script>

<script lang="ts">
  import { cn } from '../../utils';
  import {buttonVariants} from "./button-variants.ts";

  let {
    class: className = '',
    variant = 'default',
    size = 'default',
    ref = $bindable(null),
    href = undefined,
    text = undefined,
    type = 'button',
    children,
    ...restProps
  }: ButtonProps = $props()
</script>

{#if href}
  <a
    bind:this={ref}
    class={cn(buttonVariants({ size, variant }), className)}
    {href}
    {...restProps}
  >
    {text}
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    class={cn(buttonVariants({ size, variant }), className)}
    {type}
    {...restProps}
  >
    {text}
    {@render children?.()}
  </button>
{/if}
