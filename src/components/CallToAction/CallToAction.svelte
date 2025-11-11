<script lang="ts">
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import Button from '../Button/Button.svelte';
  import type { SvelteCallToActionProps } from './types';

  let {
    title,
    subtitle,
    tagline,
    callToAction,
    id,
    isDark = false,
    classes = {},
    bg,
    ref = $bindable(null),
    ...restProps
  }: SvelteCallToActionProps = $props();
</script>

<WidgetWrapper {id} {isDark} containerClass={`@container ${classes?.container ?? ''}`} {bg} bind:ref {...restProps}>
  <div class="@lg:flex gap-12">
    <Headline
      {title}
      {subtitle}
      {tagline}
      classes={{
        container: 'mb-0 md:mb-0 text-left',
        title: 'text-4xl md:text-4xl font-bold tracking-tighter mb-4 font-heading',
        subtitle: 'text-xl',
      }}
    />

    {#if callToAction}
      <div class="m-auto flex flex-nowrap flex-col md:flex-row md:justify-start gap-4 mt-6">
        {#if Array.isArray(callToAction)}
          {#each callToAction as action}
            {#if typeof action === 'string'}
              {@html action}
            {:else}
              <div class="flex w-auto">
                <Button {...action} class="w-full sm:mb-0" />
              </div>
            {/if}
          {/each}
        {:else if typeof callToAction === 'string'}
          {@html callToAction}
        {:else}
          <div class="flex w-auto">
            <Button {...callToAction} class="w-full sm:mb-0" />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</WidgetWrapper>
