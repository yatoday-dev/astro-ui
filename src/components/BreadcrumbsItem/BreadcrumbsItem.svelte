<script lang="ts">
  import { cn } from '../../utils';
  import type { SvelteBreadcrumbsItemProps } from './types';

  let {
    href = '#',
    label = 'Breadcrumb',
    currentPage = false,
    hasIcon = false,
    class: className,
    ref = $bindable(null),
    icon,
    separator,
    ...restProps
  }: SvelteBreadcrumbsItemProps = $props();
</script>

<li
  bind:this={ref}
  class={cn('item', className)}
  itemprop="itemListElement"
  itemscope
  itemtype="https://schema.org/ListItem"
  {...restProps}
>
  {#if currentPage}
    <span aria-current="page" class:has-icon={hasIcon}>
      {#if hasIcon}
        {#if icon}
          {@render icon()}
        {/if}
        <span class="sr-only">{label}</span>
      {:else}
        {label}
      {/if}
    </span>
  {:else}
    <a {href} class:has-icon={hasIcon}>
      {#if hasIcon}
        {#if icon}
          {@render icon()}
        {/if}
        <span class="sr-only">{label}</span>
      {:else}
        {label}
      {/if}
    </a>
  {/if}

  {#if separator}
    {@render separator()}
  {:else}
    <span class="separator" aria-hidden="true">/</span>
  {/if}
</li>

<style>
  :where(.item) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .item :global(.separator) {
    display: flex;
    align-items: center;
  }

  .item :global(.separator svg) {
    margin-block-start: 3px;
  }

  .item :global(svg) {
    inline-size: 1rem;
    block-size: 1rem;
  }

  li.item:last-child :global(.separator) {
    display: none;
  }

  :where(.has-icon) :global(svg) {
    display: flex;
    align-items: center;
  }

  a {
    color: currentColor;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  a:hover,
  a:focus-visible {
    text-decoration: none;
  }

  span[aria-current='page'] {
    font-weight: 500;
  }
</style>
