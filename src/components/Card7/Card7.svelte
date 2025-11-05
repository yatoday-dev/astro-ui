<script lang="ts">
  import { cn } from '~/utils';
  import Card0 from '../Card0/Card0.svelte';
  import type { SvelteCard7Props } from './types';

  let {
    title,
    description,
    callToAction,
    as = 'article',
    asHeader = 'h3',
    icon,
    classes = {},
    ref = $bindable(null),
    children,
    iconSlot,
    ...restProps
  }: SvelteCard7Props = $props();

  const {
    container: containerClass = '',
    title: titleClass = '',
    description: descriptionClass = '',
    icon: iconClass = '',
  } = classes;

  const DefaultIcon = 'tabler:chevron-right';
</script>

<Card0 {as} classes={{ container: cn('flex flex-row p-0', containerClass) }} bind:ref {...restProps}>
  <div class="flex items-center relative">
    <div class={cn('flex flex-col gap-3 justify-between h-full p-4', callToAction && 'border-r dark:border-white/10 border-black/10')}>
      {#if title}
        {#if callToAction}
          <a href={callToAction.href} class="flex items-center">
            <svelte:element this={asHeader} class={cn('text-lg md:text-xl font-bold', titleClass)}>
              {title}
            </svelte:element>
            <span class="absolute inset-0" aria-hidden="true"></span>
          </a>
        {:else}
          <svelte:element this={asHeader} class={cn('text-lg md:text-xl font-bold', titleClass)}>
            {title}
          </svelte:element>
        {/if}
      {/if}

      {#if description}
        <p class={cn('text-muted-foreground text-sm/5 md:text-base', descriptionClass)}>
          {@html description}
        </p>
      {/if}

      {@render children?.()}
    </div>

    {#if callToAction}
      {#if iconSlot}
        {@render iconSlot()}
      {:else}
        <div class={cn('flex-none size-7 mx-1', iconClass)} data-icon={icon ?? DefaultIcon}></div>
      {/if}
    {/if}
  </div>
</Card0>