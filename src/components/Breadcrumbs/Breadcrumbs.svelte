<script lang="ts">
  import { cn } from '../../utils';
  import type { SvelteBreadcrumbsProps } from './types';

  let {
    class: className = '',
    ariaLabel = 'Breadcrumbs',
    items = [],
    ref = $bindable(null),
    children,
    ...restProps
  }: SvelteBreadcrumbsProps = $props();
</script>

<nav bind:this={ref} class={cn('breadcrumbs', className)} aria-label={ariaLabel} {...restProps}>
  <ol
    class="list flex flex-wrap gap-2 m-0 p-0 list-none"
    itemscope
    itemtype="https://schema.org/BreadcrumbList"
  >
    {#if items.length === 0}
      {@render children?.()}
    {/if}
  </ol>
</nav>
