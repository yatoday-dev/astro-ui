<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import type { Card0Props } from './types';

  export let badge: Card0Props['badge'] = undefined;
  export let as: Card0Props['as'] = 'article';
  export let classes: Card0Props['classes'] = {};

  const { container: containerClass = '', badge: badgeClass = 'top-2 left-2' } = classes;
</script>

<svelte:element 
  this={as}
  class={twMerge(
    'relative flex flex-col justify-between gap-6 overflow-hidden rounded-lg border border-input bg-card text-card-foreground py-6 group',
    containerClass
  )}
>
  <div class={twMerge('absolute z-10', badgeClass)}>
    <slot name="badge">
      {#if badge}
        {@html badge}
      {/if}
    </slot>
  </div>

  <slot name="image" />

  <slot />
</svelte:element>
