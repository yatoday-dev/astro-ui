<script lang="ts">
  import type { SvelteWidgetCardSliderProps } from './types';
  import Card1 from '../Card1/Card1.svelte';
  import Headline from '../Headline/Headline.svelte';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import SwiperSlider from '../SwiperSlider/SwiperSlider.svelte';
  import { cn } from '~/utils';

  let {
    via = Card1,
    title,
    subtitle,
    tagline,
    position = 'center',
    items = [],
    isAfterContent = false,
    id = (Math.random() + 1).toString(36).substring(7),
    withNavigation = true,
    isDark = false,
    bg,
    classes = {},
    ref = $bindable(null),
    ...rest
  }: SvelteWidgetCardSliderProps = $props();

  const Component = via;
</script>

<WidgetWrapper
  {id}
  {isDark}
  {bg}
  containerClass={cn(isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '', classes?.container ?? '')}
  bind:ref
  {...rest}
>
  <Headline
    {title}
    {subtitle}
    {tagline}
    classes={classes?.headline}
    {position}
  />

  {#if items}
    <SwiperSlider {id} {withNavigation}>
      {#each items as item}
        <swiper-slide>
          <Component {...item} />
        </swiper-slide>
      {/each}
    </SwiperSlider>
  {/if}
</WidgetWrapper>
