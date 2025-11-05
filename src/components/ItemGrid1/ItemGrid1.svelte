<script lang="ts">
  import { cn } from '~/utils';
  import type { SvelteItemGrid1Props } from './types';

  let {
    class: className,
    ref = $bindable(null),
    children,
    ...restProps
  }: SvelteItemGrid1Props = $props();
</script>

<style global>
  .item-grid > :nth-child(1) { grid-area: a }
  .item-grid > :nth-child(2) { grid-area: b }
  .item-grid > :nth-child(3) { grid-area: c }
  .item-grid > :nth-child(4) { grid-area: d }
  .item-grid > :nth-child(5) { grid-area: e }

  /* Dynamic grid layouts based on number of children */
  .item-grid:has(>:nth-child(4):last-child) {
    grid-template-areas: "a a" "b c" "d d";
  }

  @media screen and (min-width: 56.25em) {
    .item-grid:has(>:nth-child(4):last-child) {
      grid-template-areas: "a a b c" "a a d d";
    }
  }
  /* 5 items */
  .item-grid:has(>:nth-child(5):last-child) {
    grid-template-areas: "a a" "b c" "d c" "d e";
  }

  @media screen and (min-width: 56.25em) {
    .item-grid:has(>:nth-child(5):last-child) {
      grid-template-areas: "a a b c" "a a d c" "a a d e";
    }
  }

  /* 3 items */
  .item-grid:has(>:nth-child(3):last-child) {
    grid-template-areas: "a a" "b c";
  }

  @media screen and (min-width: 56.25em) {
    .item-grid:has(>:nth-child(3):last-child) {
      grid-template-areas: "a a b b" "a a c c";
    }
  }

  /* 2 items */
  .item-grid:has(>:nth-child(2):last-child) {
    grid-template-areas: "a" "b";
  }

  @media screen and (min-width: 56.25em) {
    .item-grid:has(>:nth-child(2):last-child) {
      grid-template-areas: "a b";
    }
  }

  /* 1 item */
  .item-grid:has(>:nth-child(1):last-child) {
    grid-template-areas: "a";
  }
</style>

<div class="@container" bind:this={ref} {...restProps}>
  <div class={cn('item-grid grid gap-4', className)}>
    {@render children?.()}
  </div>
</div>