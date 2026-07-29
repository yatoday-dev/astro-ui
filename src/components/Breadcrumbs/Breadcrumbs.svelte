<script lang="ts">
  import { cn } from '../../utils';
  import BreadcrumbsItem from '../BreadcrumbsItem/BreadcrumbsItem.svelte';
  import type { SvelteBreadcrumbsProps } from './types';

  let {
    class: className = '',
    ariaLabel = 'Breadcrumbs',
    items = [],
    iconSlots = {},
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
    {:else}
      {#each items as { icon, position, ...item }, index (index)}
        <BreadcrumbsItem
          {...item}
          position={position ?? index + 1}
          hasIcon={!!icon}
          icon={iconSlots[`icon-${index}`]}
        />
      {/each}
    {/if}
  </ol>
</nav>
