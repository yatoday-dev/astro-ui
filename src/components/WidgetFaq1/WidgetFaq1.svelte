<script lang="ts">
  import type { SvelteWidgetFaq1Props } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import ItemGrid0 from '../ItemGrid0/ItemGrid0.svelte';
  import Card4 from '../Card4/Card4.svelte';
  import { cn } from '~/utils';

  let {
    title,
    subtitle,
    tagline,
    items = [],
    columns = 2,
    isAfterContent = false,
    position = 'center',
    id,
    isDark = false,
    classes = {},
    bg,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetFaq1Props = $props();
</script>

<WidgetWrapper
  {id}
  {isDark}
  containerClass={cn(isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '', classes?.container ?? '')}
  {bg}
  bind:ref
  {...restProps}
>
  <Headline
    {title}
    {subtitle}
    {tagline}
    classes={classes?.headline}
    {position}
  />

  <ItemGrid0 {columns}>
    {#each items as item}
      <Card4
        {...item}
        classes={{
          container: 'p-0 gap-0 border-0 bg-transparent',
          title: 'text-lg/5 font-semibold',
          icon: 'text-primary size-6',
        }}
      />
    {/each}
  </ItemGrid0>
</WidgetWrapper>
