<script lang="ts">
  import { cn } from '~/utils';
  import Card0 from '../Card0/Card0.svelte';
  import Button from '../Button/Button.svelte';
  import Image from '../Image/Image.svelte';
  import type { SvelteCard5Props } from './types';
  import type { Image as ImageType } from '~/types';

  let {
    title,
    description,
    callToAction,
    as = 'article',
    asHeader = 'h3',
    icon,
    image,
    author,
    authorDescription,
    classes = {},
    ref = $bindable(null),
    children,
    iconSlot,
    ...restProps
  }: SvelteCard5Props = $props();

  const {
    container: containerClass = 'p-6 gap-0',
    title: titleClass = '',
    description: descriptionClass = 'text-muted-foreground',
    icon: iconClass = '',
  } = classes;
</script>

<Card0 {as} classes={{ container: cn('flex h-auto', containerClass) }} bind:ref {...restProps}>
  {#if title}
    <svelte:element this={asHeader} class={cn('text-lg font-medium leading-6 pb-4', titleClass)}>
      {title}
    </svelte:element>
  {/if}
  {#if description}
    <blockquote class="flex-auto">
      <p class={descriptionClass}>
        &laquo; {@html description} &raquo;
      </p>
    </blockquote>
  {/if}

  {@render children?.()}

  <hr class="border border-input my-4" />

  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      {#if iconSlot}
        <div class="flex-none w-10">
          {@render iconSlot()}
        </div>
      {:else if icon}
        <div class="flex-none w-10">
          <div class={cn('size-10', iconClass)} data-icon={icon}></div>
        </div>
      {/if}

      {#if image}
        <div class="flex-none size-10 rounded-full overflow-hidden border border-input">
          {#if typeof image === 'string'}
            {@html image}
          {:else if typeof image === 'function'}
            {@render image()}
          {:else}
            <Image
              class="size-10 aspect-square rounded-full min-w-full min-h-full"
              width={40}
              height={40}
              widths={[400, 768]}
              layout="fixed"
              {...(image as ImageType)}
            />
          {/if}
        </div>
      {/if}

      <div class="grow">
        {#if author}
          <div class="inline-grid">
            <p class="text-base font-semibold truncate">{author}</p>
          </div>
        {/if}
        {#if authorDescription}
          <p class="text-xs text-muted-foreground">{authorDescription}</p>
        {/if}
      </div>
    </div>

    {#if callToAction}
      <Button {...callToAction} />
    {/if}
  </div>
</Card0>