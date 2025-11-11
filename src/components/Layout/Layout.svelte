<script lang="ts">
  import { cn } from '../../utils';
  import type { SvelteLayoutProps } from './types';

  let {
    class: className,
    ref = $bindable(null),
    children,
    metadata = {},
    ...restProps
  }: SvelteLayoutProps = $props();
</script>

<div
  bind:this={ref}
  class={cn('antialiased bg-background text-foreground tracking-tight', className)}
  {...restProps}
>
  {@render children?.()}
</div>
