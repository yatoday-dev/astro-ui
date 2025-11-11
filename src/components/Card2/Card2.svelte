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

        {#if typeof image === 'string'}
          {@html image}
        {:else if typeof image === 'function'}
          {@render image()}
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
