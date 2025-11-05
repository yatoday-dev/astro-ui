<script lang="ts">
  import { cn } from '~/utils';
  import Card0 from '../Card0/Card0.svelte';
  import Image from '../Image/Image.svelte';
  import type { SvelteCard6Props } from './types';
  import type { Image as ImageType } from '~/types';

  let {
    title,
    description,
    callToAction,
    image,
    classes = {},
    as = 'article',
    asHeader = 'h3',
    badge,
    badgeTopRight,
    badgeBottomRight,
    badgeBottomLeft,
    widths = [800, 1600],
    size = 800,
    sizes = '(max-width: 1600px) 800px, 1600px',
    ref = $bindable(null),
    children,
    badgeTopRightSlot,
    badgeBottomRightSlot,
    badgeBottomLeftSlot,
    ...restProps
  }: SvelteCard6Props = $props();

  const {
    container: containerClass = '',
    content: contentClass = 'bg-gradient-to-b from-transparent to-black/80',
    title: titleClass = '',
    description: descriptionClass = '',
    image: imageClass = '',
    imageLayout = 'cover',
    badge: badgeClass = 'top-2 left-2',
    aspect: aspectClass = 'pb-[100%]',
  } = classes as {
    imageLayout?: 'fixed' | 'constrained' | 'fullWidth' | 'cover' | 'responsive' | 'contained';
  } & Record<string, string>;

  const urlForImage = $derived(() => {
    if (Array.isArray(callToAction)) {
      const firstAction = callToAction[0];
      return typeof firstAction === 'string' ? firstAction : firstAction?.href;
    }
    return typeof callToAction === 'string' ? callToAction : callToAction?.href;
  });
</script>

<Card0
  {as}
  {badgeTopRight}
  {badgeBottomRight}
  {badgeBottomLeft}
  classes={{
    container: cn('relative h-full bg-gray-200 dark:bg-zinc-700 border-transparent text-inherit justify-start py-0 @container', containerClass),
    badge: badgeClass,
    badgeTopRight: classes?.badgeTopRight,
  }}
  bind:ref
  {...restProps}
>
  <svelte:element
    this={urlForImage() ? 'a' : 'div'}
    href={urlForImage()}
    class={cn('flex flex-col gap-y-2 absolute top-0 right-0 bottom-0 left-0 z-10', image ? 'justify-end' : 'justify-center')}
  >
    <div class={cn('p-6 @2xl:p-10 pt-8 @2xl:pt-12', contentClass, !image && 'bg-transparent')}>
      {#if badge}
        <div>{@html badge}</div>
      {/if}

      {#if badgeBottomRightSlot || badgeBottomRight}
        <div class={cn('absolute z-10 bottom-2 right-2', classes?.badgeBottomRight)}>
          {#if badgeBottomRightSlot}
            {@render badgeBottomRightSlot()}
          {:else if badgeBottomRight}
            {@html badgeBottomRight}
          {/if}
        </div>
      {/if}

      {#if badgeBottomLeftSlot || badgeBottomLeft}
        <div class={cn('absolute z-10 bottom-2 left-2', classes?.badgeBottomLeft)}>
          {#if badgeBottomLeftSlot}
            {@render badgeBottomLeftSlot()}
          {:else if badgeBottomLeft}
            {@html badgeBottomLeft}
          {/if}
        </div>
      {/if}

      <svelte:element
        this={asHeader}
        class={cn('font-bold text-lg @lg:text-xl @2xl:text-2xl', urlForImage() && 'group-hover:underline', titleClass)}
      >
        {title}
      </svelte:element>

      <div class={cn('text-sm @lg:text-base @2xl:text-lg mt-2', descriptionClass)}>
        {@render children?.()}
        {description}
      </div>

      {#if urlForImage()}
        <div class="size-6 overflow-hidden mt-4">
          <div class="grid grid-cols-2 w-12 gap-2 duration-400 transition-transform -translate-x-7 group-hover:translate-x-0">
            <div class="size-6">→</div>
            <div class="size-6">→</div>
          </div>
        </div>
      {/if}
    </div>
  </svelte:element>

  <div class="relative flex w-full h-full overflow-hidden">
    <div class={cn('relative w-full h-auto', aspectClass)}>
      {#if image}
        {#if typeof image === 'string'}
          {@html image}
        {:else if typeof image === 'function'}
          {@render image()}
        {:else}
          <Image
            class={cn('w-full h-full absolute left-0 top-0 p-0', imageClass)}
            {widths}
            width={size}
            height={size}
            {sizes}
            layout={imageLayout}
            loading="lazy"
            decoding="async"
            {...(image as ImageType)}
          />
        {/if}
      {/if}
    </div>
  </div>
</Card0>