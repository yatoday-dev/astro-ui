<script lang="ts">
  import { cn } from '../../utils';
  import Card0 from '../Card0/Card0.svelte';
  import Button from '../Button/Button.svelte';
  import type { SvelteCard4Props } from './types';

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
    footerSlot,
    ...restProps
  }: SvelteCard4Props = $props();

  const {
    container: containerClass = 'p-6 gap-0',
    title: titleClass = '',
    description: descriptionClass = '',
    icon: iconClass = '',
    action: actionClass = '',
  } = classes;
</script>

<Card0
  {as}
  classes={{
    container: cn('flex flex-row', containerClass),
  }}
  bind:ref
  {...restProps}
>
  <div class="flex justify-center">
    {#if iconSlot}
      {@render iconSlot()}
    {:else if icon}
      <div class={cn('size-7 mr-2 rtl:mr-0 rtl:ml-2', iconClass)} data-icon={icon}></div>
    {/if}
  </div>
  <div class="flex flex-col gap-3 justify-between">
    <div>
      {#if title}
        <svelte:element this={asHeader} class={cn('text-lg md:text-xl font-bold', titleClass)}>
          {title}
        </svelte:element>
      {/if}
      {#if description}
        <p class={cn('text-muted-foreground text-sm/5 md:text-base', descriptionClass)}>
          {@html description}
        </p>
      {/if}

      {@render children?.()}
    </div>

    {#if callToAction}
      <div>
        {#if footerSlot}
          {@render footerSlot()}
        {/if}

        {#if Array.isArray(callToAction)}
          <div class={cn('flex gap-2', actionClass)}>
            {#each callToAction as action}
              {#if typeof action === 'string'}
                {@html action}
              {:else}
                <Button {...action} />
              {/if}
            {/each}
          </div>
        {:else if typeof callToAction === 'string'}
          {@html callToAction}
        {:else}
          <div class={cn('', actionClass)}>
            <Button {...callToAction} />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Card0>