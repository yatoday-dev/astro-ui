<script lang="ts">
  import type { SvelteWidgetStepsTimelineProps } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import Timeline from '../Timeline/Timeline.svelte';
  import Image from '../Image/Image.svelte';
  import { cn } from '../../utils';
  import type { Image as ImageType } from '~/types';

  let {
    title,
    subtitle,
    tagline,
    items = [],
    image,
    isReversed = false,
    isAfterContent = false,
    defaultIcon,
    id,
    isDark = false,
    classes = {},
    bg,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetStepsTimelineProps = $props();
</script>

<WidgetWrapper
  {id}
  {isDark}
  containerClass={cn('max-w-5xl', isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '', classes?.container ?? '')}
  {bg}
  bind:ref
  {...restProps}
>
  <div class={cn('flex flex-col gap-8 md:gap-12', { 'md:flex-row-reverse': isReversed }, { 'md:flex-row': image })}>
    <div class={cn('md:py-4 md:self-center', { 'md:basis-1/2': image }, { 'w-full': !image })}>
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
      <Timeline {items} classes={classes?.items} {defaultIcon} />
    </div>
    {#if image}
      <div class="relative md:basis-1/2">
        {#if typeof image === 'string'}
          {@html image}
        {:else if typeof image === 'function'}
          {@render image()}
        {:else}
          <Image
            class="inset-0 object-cover object-top w-full rounded-md shadow-lg md:absolute md:h-full bg-muted"
            widths={[400, 768]}
            sizes="(max-width: 768px) 100vw, 432px"
            width={432}
            height={768}
            layout="cover"
            src={(image as ImageType)?.src}
            alt={(image as ImageType)?.alt || ''}
          />
        {/if}
      </div>
    {/if}
  </div>
</WidgetWrapper>
