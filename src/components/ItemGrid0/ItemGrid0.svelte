<script lang="ts">
  import { cn } from '~/utils';
  import type { SvelteItemGrid0Props } from './types';

  let {
    class: className,
    columns = 1,
    ref = $bindable(null),
    children,
    ...restProps
  }: SvelteItemGrid0Props = $props();

  const gridClass = $derived(() => {
    const colNum = Number(columns);
    if (colNum === 4) {
      return '@5xl:grid-cols-4 @3xl:grid-cols-3 @md:grid-cols-2';
    } else if (colNum === 3) {
      return '@3xl:grid-cols-3 @md:grid-cols-2';
    } else if (colNum === 2) {
      return '@md:grid-cols-2';
    }
    return '';
  });
</script>

<div class="@container" bind:this={ref} {...restProps}>
  <div class={cn('grid gap-6', gridClass(), className)}>
    {@render children?.()}
  </div>
</div>
