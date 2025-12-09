<script lang="ts">
  import { cn } from '../../utils';
  import Card0 from '../Card0/Card0.svelte';
  import Image from '../Image/Image.svelte';
  import type { SvelteCard2Props } from './types';
  import type { Image as ImageType } from '~/types';

  let {
    title,
    description,
    icon,
    image,
    images,
    url = '',
    callToAction,
    classes = {},
    as = 'article',
    asHeader = 'h3',
    badge,
    badgeTopRight,
    badgeBottomRight,
    badgeBottomLeft,
    ref = $bindable(null),
    children,
    iconSlot,
    badgeTopRightSlot,
    badgeBottomRightSlot,
    badgeBottomLeftSlot,
    ...restProps
  }: SvelteCard2Props = $props();

  const {
    container: containerClass = '',
    title: titleClass = '',
    content: contentClass = 'text-muted-foreground',
    icon: iconClass = '',
    image: imageClass = '',
    imageLayout = 'cover',
    badge: badgeClass = 'top-2 left-2',
  } = classes as {
    imageLayout?: 'fixed' | 'constrained' | 'fullWidth' | 'cover' | 'responsive' | 'contained';
  } & Record<string, string>;

  // Multi-image gallery state
  const hasMultipleImages = $derived(images && images.length > 1);
  let activeImageIndex = $state(0);

  function handleZoneHover(index: number) {
    activeImageIndex = index;
  }

  function handleGalleryLeave() {
    activeImageIndex = 0;
  }
</script>

<Card0
  {as}
  {badge}
  {badgeTopRight}
  {badgeBottomRight}
  {badgeBottomLeft}
  classes={{
    container: cn('group', containerClass),
    badge: badgeClass,
    badgeTopRight: classes?.badgeTopRight,
  }}
  bind:ref
  {...restProps}
>
  {#snippet imageSlot()}
    {#if image || hasMultipleImages}
      <div class={cn('relative w-full overflow-hidden -mt-6 h-40 bg-gray-400 dark:bg-zinc-700', imageClass)}>
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

        {#if hasMultipleImages && images}
          <!-- Multi-image gallery with hover zones -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="card2-gallery relative w-full h-full"
            data-image-count={images.length}
            onmouseleave={handleGalleryLeave}
          >
            <!-- All images stacked -->
            {#each images as img, index}
              <div
                class={cn(
                  'card2-gallery-image absolute inset-0 transition-opacity duration-200',
                  index === activeImageIndex ? 'opacity-100' : 'opacity-0'
                )}
                data-index={index}
              >
                {#if typeof img === 'string'}
                  {@html img}
                {:else}
                  <Image
                    class={cn(
                      'w-full md:h-full',
                      imageClass,
                      (url || callToAction?.href) && 'group-hover:scale-105 transition duration-300'
                    )}
                    widths={[400, 900]}
                    width={400}
                    height={400}
                    layout={imageLayout}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    {...img}
                  />
                {/if}
              </div>
            {/each}

            <!-- Invisible hover zones -->
            <div class="absolute inset-0 flex z-20">
              {#each images as _, index}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                  class="card2-hover-zone flex-1 h-full cursor-pointer"
                  data-zone={index}
                  onmouseenter={() => handleZoneHover(index)}
                />
              {/each}
            </div>

            <!-- Indicator dots -->
            <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {#each images as _, index}
                <div
                  class={cn(
                    'card2-indicator w-1.5 h-1.5 rounded-full transition-all duration-200',
                    index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                  )}
                  data-indicator={index}
                />
              {/each}
            </div>
          </div>
        {:else if typeof image === 'string'}
          {@html image}
        {:else if typeof image === 'function'}
          {@render image()}
        {:else if image}
          <Image
            class={cn(
              'w-full md:h-full',
              imageClass,
              (url || callToAction?.href) && 'group-hover:scale-105 transition duration-300'
            )}
            widths={[400, 900]}
            width={400}
            height={400}
            layout={imageLayout}
            loading="lazy"
            decoding="async"
            {...(image as ImageType)}
          />
        {/if}
      </div>
    {/if}

    {#if iconSlot || icon}
      <div class="h-12 px-6">
        {#if iconSlot}
          {@render iconSlot()}
        {:else if icon}
          <div
            class={cn(
              'w-12 h-12 text-primary',
              image ? 'mt-6' : '',
              iconClass,
              (url || callToAction?.href) && 'group-hover:scale-105 transition duration-300'
            )}
            data-icon={icon}
          ></div>
        {/if}
      </div>
    {/if}
  {/snippet}

  <div class={cn('px-6 space-y-6')}>
    <div>
      <svelte:element this={asHeader} class={cn('text-xl font-bold', titleClass)}>
        {#if url || callToAction?.href}
          <a href={url || callToAction?.href || '/'} class="after:content-[''] after:inset-0 after:absolute">
            {title}
          </a>
        {:else}
          {title}
        {/if}
      </svelte:element>

      <div class={cn('mt-2', contentClass)}>
        {@render children?.()}
        {description}
      </div>
    </div>
  </div>
</Card0>
