<script lang="ts">
  import { cn } from '../../utils';
  import {themeVariants} from "./theme-variants.ts";
  import type {SvelteButtonProps} from "~/components/Button/types.ts";
  
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
  }: SvelteButtonProps = $props()
</script>

{#if href}
  <a
    bind:this={ref}
    class={cn(themeVariants({ size, variant }), className)}
    {href}
    {...restProps}
  >
    {text}
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    class={cn(themeVariants({ size, variant }), className)}
    {type}
    {...restProps}
  >
    {text}
    {@render children?.()}
  </button>
{/if}
