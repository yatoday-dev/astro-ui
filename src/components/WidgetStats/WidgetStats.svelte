<script lang="ts">
  import type { SvelteWidgetStatsProps } from './types';
  import Headline from '../Headline/Headline.svelte';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Stats0 from '../Stats0/Stats0.svelte';
  import Button from '../Button/Button.svelte';
  import { cn } from '../../utils';

  let {
    title,
    subtitle,
    tagline,
    items = [],
    callToAction,
    position = 'center',
    id,
    isDark = false,
    classes = {},
    isAfterContent = false,
    bg,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetStatsProps = $props();
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

  <Stats0 {items} classes={classes?.items} />

  {#if callToAction}
    <div class="flex justify-center mx-auto w-fit mt-8 md:mt-12 font-medium">
      <Button {...callToAction} />
    </div>
  {/if}
</WidgetWrapper>
