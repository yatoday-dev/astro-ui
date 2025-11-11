<script lang="ts">
  import { cn } from '~/utils';
  import Background from '../Background/Background.svelte';
  import type { SvelteWidgetWrapperProps } from './types';

  let {
    id,
    isDark = false,
    class: className = '',
    containerClass = '',
    bg,
    as = 'section',
    isAfterContent = false,
    ref = $bindable(null),
    children,
    ...restProps
  }: SvelteWidgetWrapperProps = $props();
</script>

<svelte:element this={as} class={cn('relative', className)} {id} bind:this={ref} {...restProps}>
  <!-- Background layer -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    {#if bg}
      {@render bg()}
    {:else}
      <Background {isDark} />
    {/if}
  </div>

  <!-- Content layer -->
  <div
    class={cn(
      'relative mx-auto max-w-7xl 2xl:max-w-[96rem] px-4 md:px-6 lg:px-10 text-default',
      isAfterContent ? 'pt-6 md:pt-8 pb-12 md:pb-16 lg:pb-20' : 'py-12 md:py-16 lg:py-20',
      containerClass
    )}
    class:dark={isDark}
  >
    {@render children?.()}
  </div>
</svelte:element>
