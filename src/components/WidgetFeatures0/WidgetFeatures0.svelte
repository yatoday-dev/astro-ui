<script lang="ts">
  import type { SvelteWidgetFeatures0Props } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import Button from '../Button/Button.svelte';

  let {
    title,
    subtitle,
    tagline,
    isAfterContent = false,
    callToAction,
    position = 'center',
    id,
    isDark = false,
    classes = {},
    children,
    bgSlot,
  }: SvelteWidgetFeatures0Props = $props();
</script>

<WidgetWrapper
  {id}
  {isDark}
  containerClass={`${isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : ''} ${classes?.container ?? ''}`}
  {bgSlot}
>
  <Headline
    {title}
    {subtitle}
    {tagline}
    classes={classes?.headline as Record<string, string>}
    {position}
  />
  {#if children}
    {@render children()}
  {/if}

  {#if callToAction}
    <div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 mt-6">
      {#if Array.isArray(callToAction)}
        {#each callToAction as action}
          {#if typeof action === 'string'}
            {@html action}
          {:else}
            <div class="flex w-full sm:w-auto">
              <Button {...(action || {})} class="w-full sm:mb-0" />
            </div>
          {/if}
        {/each}
      {:else if typeof callToAction === 'string'}
        {@html callToAction}
      {:else}
        <div class="flex w-full sm:w-auto">
          <Button {...(callToAction || {})} class="w-full sm:mb-0" />
        </div>
      {/if}
    </div>
  {/if}
</WidgetWrapper>
