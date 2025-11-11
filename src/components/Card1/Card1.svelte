<script lang="ts">
  import { cn } from '~/utils';
  import Card0 from '../Card0/Card0.svelte';
  import Image from '../Image/Image.svelte';
  import Button from '../Button/Button.svelte';
  import type { SvelteCard1Props } from './types';
  import type { Image as ImageType } from '~/types';

  let {
    title,
    description,
    image,
    icon,
    data = [],
    links = [],
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
    badgeSlot,
    badgeTopRightSlot,
    badgeBottomRightSlot,
    badgeBottomLeftSlot,
    footerSlot,
    ...restProps
  }: SvelteCard1Props = $props();

  const {
    title: titleClass = '',
    description: descriptionClass = 'text-muted-foreground',
    image: imageClass = '',
    imageLayout = 'cover',
    icon: iconClass = '',
    quickLink: quickLinkClass = 'font-semibold underline text-primary hover:text-primary/80',
    action: actionClass = '',
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
    content: 'space-y-6',
    badge: classes?.badge,
    badgeTopRight: classes?.badgeTopRight,
  }}
  bind:ref
  {...restProps}
>
  {#snippet imageSlot()}
    {#if image}
      <div class={cn('relative w-full overflow-hidden -mt-6 h-60 bg-gray-400 dark:bg-zinc-700', imageClass)}>
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

    {#if iconSlot || icon}
      <div class="px-6">
        {#if iconSlot}
          {@render iconSlot()}
        {:else if icon}
          <!-- Icon placeholder - users should provide icon via iconSlot snippet -->
          <div class={cn('w-12 h-12 text-primary', image ? 'mt-6' : '', iconClass)} data-icon={icon}></div>
        {/if}
      </div>
    {/if}
  {/snippet}

  <div class={cn('px-6 space-y-6')}>
    <!-- Title & Description -->
    <div>
      <svelte:element this={asHeader} class={cn('text-base/5 md:text-xl font-bold', titleClass)}>
        {title}
      </svelte:element>

      <div class={cn('mt-1', descriptionClass)}>
        {@render children?.()}
        {description}
      </div>
    </div>

    {#if links && links.length > 0}
      <div class="flex flex-col">
        {#each links as link}
          <a href={link.href} class={cn('transition-colors', quickLinkClass)}>
            {link.text}
          </a>
        {/each}
      </div>
    {/if}
  </div>

  {#if data && data.length > 0}
    <div class="text-sm">
      {#each data as item}
        <div class="flex items-center justify-between py-2 px-6 odd:bg-white even:bg-slate-50 dark:odd:bg-transparent dark:even:bg-zinc-800">
          <div class="text-muted-foreground">{item.name}</div>
          <div>{item.value}</div>
        </div>
      {/each}
    </div>
  {/if}

  {#if callToAction}
    <div class={cn('w-full px-6')}>
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
</Card0>
