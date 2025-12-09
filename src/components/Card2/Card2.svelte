<script lang="ts">
  import { cn } from '../../utils';
  import Card0 from '../Card0/Card0.svelte';
  import ImageGallery from '../ImageGallery/ImageGallery.svelte';
  import type { SvelteCard2Props } from './types';

  let {
    title,
    description,
    icon,
    image,
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

  // Check if image is HTML string or snippet (not array/object)
  const isHtmlImage = $derived(typeof image === 'string');
  const isSnippet = $derived(typeof image === 'function');
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
    {#if image}
      <div class={cn('relative w-full overflow-hidden -mt-6 h-40 bg-gray-400 dark:bg-zinc-700', imageClass)}>
        {#if isHtmlImage}
          {@html image}
        {:else if isSnippet}
          {@render image()}
        {:else}
          <ImageGallery
            {image}
            imageClass={cn(
              'w-full md:h-full',
              (url || callToAction?.href) && 'group-hover:scale-105 transition duration-300'
            )}
            {imageLayout}
            widths={[400, 900]}
            width={400}
            height={400}
            hoverEffect={!!(url || callToAction?.href)}
          >
            {#snippet badgeBottomRight()}
              {#if badgeBottomRightSlot}
                <div class={cn('', classes?.badgeBottomRight)}>
                  {@render badgeBottomRightSlot()}
                </div>
              {:else if badgeBottomRight}
                <div class={cn('', classes?.badgeBottomRight)}>
                  {@html badgeBottomRight}
                </div>
              {/if}
            {/snippet}
            {#snippet badgeBottomLeft()}
              {#if badgeBottomLeftSlot}
                <div class={cn('', classes?.badgeBottomLeft)}>
                  {@render badgeBottomLeftSlot()}
                </div>
              {:else if badgeBottomLeft}
                <div class={cn('', classes?.badgeBottomLeft)}>
                  {@html badgeBottomLeft}
                </div>
              {/if}
            {/snippet}
          </ImageGallery>
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
