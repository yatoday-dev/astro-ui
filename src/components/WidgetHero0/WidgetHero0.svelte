<script lang="ts">
  import type { SvelteWidgetHero0Props } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import Stats0 from '../Stats0/Stats0.svelte';
  import Button from '../Button/Button.svelte';
  import { cn } from '../../utils';

  let {
    title,
    subtitle,
    tagline,
    position = 'center',
    image,
    actions = [],
    links = [],
    stats = [],
    id,
    isDark = false,
    classes = {},
    children,
    bgSlot,
  }: SvelteWidgetHero0Props = $props();

  const { container: containerClass = '', bg: bgClass = '' } = classes;
</script>

<WidgetWrapper {id} {isDark} containerClass={containerClass as string} bgSlot={bgSlot}>
  <div class={cn('relative z-30', children && 'grid grid-cols-3 gap-6')}>
    <div class={cn(children && 'col-span-2')}>
      <Headline
        {title}
        {subtitle}
        {tagline}
        classes={{
          container: cn(
            'max-w-3xl',
            { 'mx-auto': position === 'center' },
            { 'text-right': position === 'right' },
            { 'text-left': position === 'left' }
          ),
          ...((classes?.headline as Record<string, never>) ?? {}),
        }}
      />

      {#if links.length > 0}
        <div
          class={cn(
            'grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold sm:grid-cols-2 md:flex lg:gap-x-10 mb-10',
            { 'justify-center': position === 'center' }
          )}
        >
          {#each links as link}
            <a href={link.href} class={cn('flex items-center gap-2', { 'justify-center': position === 'center' })}>
              {link.text} <span aria-hidden="true">&rarr;</span>
            </a>
          {/each}
        </div>
      {/if}

      {#if stats.length > 0}
        <Stats0 items={stats} classes={classes?.stats as Record<string, string>} />
      {/if}

      {#if actions && actions.length > 0}
        <div
          class={cn('grid grid-cols-1 gap-x-4 gap-y-6 text-base/7 font-semibold sm:grid-cols-2 md:flex', {
            'justify-center': position === 'center',
          })}
        >
          {#each actions as btnProps}
            <Button {...btnProps} />
          {/each}
        </div>
      {/if}
    </div>

    {#if children}
      <div class="w-full">
        {@render children()}
      </div>
    {/if}
  </div>
</WidgetWrapper>