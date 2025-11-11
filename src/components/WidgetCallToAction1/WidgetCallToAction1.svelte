<script lang="ts">
  import type { SvelteWidgetCallToAction1Props } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import Button from '../Button/Button.svelte';
  import { cn } from '~/utils';

  let {
    title,
    subtitle,
    tagline,
    actions,
    isAfterContent = false,
    id,
    isDark = false,
    classes = {},
    bg,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetCallToAction1Props = $props();
</script>

<WidgetWrapper
  {id}
  {isDark}
  containerClass={cn('@container', isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '', classes?.container ?? '')}
  {bg}
  bind:ref
  {...restProps}
>
  <div class="@lg:flex gap-12">
    <Headline
      {title}
      {subtitle}
      {tagline}
      classes={{
        container: 'mb-0 md:mb-0 text-left',
        title: 'text-2xl md:text-4xl font-bold tracking-tighter mb-4 font-heading',
        subtitle: 'text-sm md:text-xl',
        ...((classes?.headline || {}) as Record<string, string>),
      }}
    />
    {#if actions}
      <div class="m-auto flex flex-nowrap flex-col md:flex-row md:justify-start gap-4 mt-6">
        {#if Array.isArray(actions)}
          {#each actions as action}
            <div class="flex w-auto">
              <Button {...action} class={cn('w-full sm:mb-0', classes?.action ?? '')} />
            </div>
          {/each}
        {:else if typeof actions === 'function'}
          {@render actions()}
        {:else if typeof actions === 'string'}
          {@html actions}
        {/if}
      </div>
    {/if}
  </div>
</WidgetWrapper>
