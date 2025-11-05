<script lang="ts">
  import { cn } from '~/utils';
  import Card0 from '../Card0/Card0.svelte';
  import Image from '../Image/Image.svelte';
  import Button from '../Button/Button.svelte';
  import type { SvelteCard3Props } from './types';
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
    ref = $bindable(null),
    children,
    badgeTopRightSlot,
    badgeBottomRightSlot,
    badgeBottomLeftSlot,
    footerSlot,
    ...restProps
  }: SvelteCard3Props = $props();

  const {
    container: containerClass = 'bg-transparent border-transparent',
    title: titleClass = '',
    description: descriptionClass = 'text-muted-foreground',
    image: imageClass = '',
    imageLayout = 'cover',
    action: actionClass = '',
    badge: badgeClass = 'top-2 left-2',
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
  {badge}
  {badgeTopRight}
  {badgeBottomRight}
  {badgeBottomLeft}
  classes={{
    container: cn(containerClass, 'justify-start py-0'),
    badge: badgeClass,
    badgeTopRight: classes?.badgeTopRight,
  }}
  bind:ref
  {...restProps}
>
  {#snippet imageSlot()}
    {#if image}
      <div class={cn('relative w-full aspect-square overflow-hidden rounded-lg bg-gray-400 dark:bg-zinc-700', imageClass)}>
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

        {#if urlForImage()}
          <a href={urlForImage()} class="group">
            {#if typeof image === 'string'}
              {@html image}
            {:else if typeof image === 'function'}
              {@render image()}
            {:else}
              <Image
                class={cn('w-full h-full hover:scale-105 transition duration-300')}
                widths={[400, 900]}
                width={400}
                height={400}
                layout={imageLayout}
                loading="lazy"
                decoding="async"
                {...(image as ImageType)}
              />
            {/if}
          </a>
        {:else if typeof image === 'string'}
          {@html image}
        {:else if typeof image === 'function'}
          {@render image()}
        {:else}
          <Image
            class={cn('w-full h-full')}
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
  {/snippet}

  <div class="flex items-start gap-2">
    <div>
      <svelte:element this={asHeader} class={cn('text-lg md:text-xl font-bold', titleClass)}>
        {title}
      </svelte:element>

      <div class={cn('mt-2 text-sm md:text-base leading-5 md:leading-6', descriptionClass)}>
        {@render children?.()}
        {description}
      </div>
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