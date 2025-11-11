<script lang="ts">
  import type { SvelteStats0Props } from './types';
  import { cn } from '~/utils';

  let {
    items = [],
    classes = {},
    iconSlots = {},
  }: SvelteStats0Props = $props();

  const {
    container: containerClass = 'text-center w-full justify-center',
    content: contentClass = 'md:border-r border-input md:last:border-none',
    title: titleClass = 'text-primary text-3xl lg:text-5xl xl:text-6xl',
    description: descriptionClass = 'font-medium uppercase tracking-widest text-muted-foreground text-sm lg:text-base',
    icon: iconClass = 'text-primary',
  } = classes;
</script>

<dl class={cn('flex flex-wrap', containerClass)}>
  {#each items as item, index}
    <div class={cn('p-4 w-full sm:w-1/2 md:w-1/4 max-w-60 intersect-once intersect-quarter', contentClass)}>
      {#if item.icon && iconSlots[`icon-${index}`]}
        <div class={cn('flex items-center justify-center mx-auto mb-4', iconClass)}>
          {@render iconSlots[`icon-${index}`]()}
        </div>
      {/if}
      {#if item.title}
        <dt class={cn('font-heading font-bold', titleClass)}>{item.title}</dt>
      {/if}
      {#if item.description}
        <dd class={cn('', descriptionClass)}>{item.description}</dd>
      {/if}
    </div>
  {/each}
</dl>