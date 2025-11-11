<script lang="ts">
  import type { SvelteWidgetTestimonialsProps } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import ItemGrid0 from '../ItemGrid0/ItemGrid0.svelte';
  import Headline from '../Headline/Headline.svelte';
  import Button from '../Button/Button.svelte';
  import Card5 from '../Card5/Card5.svelte';
  import { cn } from '~/utils';

  let {
    title,
    subtitle,
    tagline,
    items = [],
    callToAction,
    columns = 3,
    isAfterContent = false,
    position = 'center',
    id,
    isDark = false,
    classes = {},
    bg,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetTestimonialsProps = $props();
</script>

<WidgetWrapper
  {id}
  {isDark}
  containerClass={cn('max-w-6xl mx-auto', isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '', classes?.container ?? '')}
  {bg}
  bind:ref
  {...restProps}
>
  <Headline {title} {subtitle} {tagline} {position} />

  <ItemGrid0 {columns}>
    {#each items as item}
      <Card5
        {...item}
        classes={{
          container: 'p-6 gap-0 shadow-xl dark:shadow-none border-0 bg-card text-card-foreground',
          ...((classes?.items || {}) as Record<string, string>),
        }}
      />
    {/each}
  </ItemGrid0>

  {#if callToAction}
    <div class="flex justify-center mx-auto w-fit mt-8 md:mt-12 font-medium">
      <Button {...callToAction} />
    </div>
  {/if}
</WidgetWrapper>
