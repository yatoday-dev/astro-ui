<script lang="ts">
  import type { SvelteWidgetSteps1Props } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import Button from '../Button/Button.svelte';
  import { cn } from '../../utils';

  let {
    title,
    subtitle,
    tagline,
    callToAction,
    items = [],
    isReversed = false,
    isAfterContent = false,
    id,
    isDark = false,
    classes = {},
    bg,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetSteps1Props = $props();
</script>

<WidgetWrapper
  {id}
  {isDark}
  containerClass={cn(isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '', classes?.container ?? '')}
  {bg}
  bind:ref
  {...restProps}
>
  <div class={cn('flex flex-col gap-8 md:gap-12 md:flex-row', isReversed ? 'md:flex-row-reverse' : '')}>
    <div class={cn('w-full lg:w-1/2 gap-8 md:gap-12', isReversed ? 'lg:ml-16 md:ml-8 ml-0' : 'lg:mr-16 md:mr-8 mr-0')}>
      <Headline
        {title}
        {subtitle}
        {tagline}
        classes={{
          container: 'text-left rtl:text-right',
          title: 'text-3xl lg:text-4xl',
          ...((classes?.headline || {}) as Record<string, string>),
        }}
      />

      <div class="w-full text-center md:text-left rtl:md:text-right">
        {#if typeof callToAction === 'string'}
          {@html callToAction}
        {:else if typeof callToAction === 'function'}
          {@render callToAction()}
        {:else if callToAction && callToAction.text && callToAction.href}
          <Button {...callToAction} class="mb-12 w-auto" />
        {/if}
      </div>
    </div>
    <div class="w-full lg:w-1/2 px-0">
      <ul class="space-y-10">
        {#each items as { title: itemTitle, description, icon, href }, index}
          <li class="flex md:-mx-4">
            <div class="pr-4 sm:pl-4 rtl:pr-0 rtl:pl-4 rtl:sm:pl-0 rtl:sm:pr-4">
              <span
                class={cn(
                  'flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold rounded-full',
                  classes?.itemIcon || 'bg-card text-card-foreground'
                )}
              >
                {#if icon}
                  <span class="w-6 h-6 icon-bold" data-icon={icon}></span>
                {:else}
                  {index + 1}
                {/if}
              </span>
            </div>
            <div class="pl-4 rtl:pl-0 rtl:pr-4">
              <h3 class={cn('mb-3 text-xl font-semibold font-heading', classes?.itemTitle || '')}>
                {@html itemTitle}
              </h3>
              {#if href}
                <a
                  {href}
                  class={cn('hover:underline', classes?.itemDescription || '')}
                >
                  {@html description}
                </a>
              {:else}
                <p class={classes?.itemDescription || ''}>
                  {@html description}
                </p>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</WidgetWrapper>
