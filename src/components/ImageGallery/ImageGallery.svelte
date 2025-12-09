<script lang="ts">
  import { cn } from '../../utils';
  import Image from '../Image/Image.svelte';
  import type { SvelteImageGalleryProps } from './types';
  import type { Image as ImageType } from '~/types';

  let {
    image,
    imageClass = '',
    imageLayout = 'cover',
    widths = [400, 900],
    width = 400,
    height = 400,
    sizes = '(max-width: 900px) 400px, 900px',
    hoverEffect = false,
    class: className = '',
    ref = $bindable(null),
    badgeBottomRight,
    badgeBottomLeft,
    ...restProps
  }: SvelteImageGalleryProps = $props();

  // Normalize image prop: convert to array, check if gallery mode
  const images = $derived(Array.isArray(image) ? image : image ? [image] : []);
  const hasMultipleImages = $derived(images.length > 1);

  // Gallery state
  let activeImageIndex = $state(0);

  function handleZoneHover(index: number) {
    activeImageIndex = index;
  }

  function handleGalleryLeave() {
    activeImageIndex = 0;
  }
</script>

{#if images.length > 0}
  <div bind:this={ref} class={cn('image-gallery relative w-full h-full', className)} {...restProps}>
    {#if badgeBottomRight}
      <div class="absolute z-30 bottom-2 right-2">
        {@render badgeBottomRight()}
      </div>
    {/if}

    {#if badgeBottomLeft}
      <div class="absolute z-30 bottom-2 left-2">
        {@render badgeBottomLeft()}
      </div>
    {/if}

    {#if hasMultipleImages}
      <!-- Multi-image gallery with hover zones -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="image-gallery-multi relative w-full h-full"
        data-image-count={images.length}
        onmouseleave={handleGalleryLeave}
      >
        <!-- All images stacked -->
        {#each images as img, index}
          <div
            class={cn(
              'image-gallery-item absolute inset-0 transition-opacity duration-200',
              index === activeImageIndex ? 'opacity-100' : 'opacity-0'
            )}
            data-index={index}
          >
            {#if typeof img === 'string'}
              {@html img}
            {:else}
              <Image
                class={cn(
                  'w-full h-full',
                  imageClass,
                  hoverEffect && 'group-hover:scale-105 transition duration-300'
                )}
                {widths}
                {width}
                {height}
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
              class="image-gallery-zone flex-1 h-full cursor-pointer"
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
                'image-gallery-indicator w-1.5 h-1.5 rounded-full transition-all duration-200',
                index === activeImageIndex ? 'bg-white' : 'bg-white/50'
              )}
              data-indicator={index}
            />
          {/each}
        </div>
      </div>
    {:else}
      <!-- Single image -->
      {#if typeof images[0] === 'string'}
        {@html images[0]}
      {:else}
        <Image
          class={cn(
            'w-full h-full',
            imageClass,
            hoverEffect && 'group-hover:scale-105 transition duration-300'
          )}
          {widths}
          {width}
          {height}
          layout={imageLayout}
          loading="lazy"
          decoding="async"
          {...(images[0] as ImageType)}
        />
      {/if}
    {/if}
  </div>
{/if}
