<script lang="ts">
  import type { SvelteWidgetSwiperPhotoSliderProps } from './types';
  import Headline from '../Headline/Headline.svelte';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import SwiperSlider from '../SwiperSlider/SwiperSlider.svelte';
  import Button from '../Button/Button.svelte';
  import Image from '../Image/Image.svelte';
  import { cn } from '~/utils';

  let {
    title,
    subtitle,
    tagline,
    images = [],
    position = 'center',
    isAfterContent = false,
    callToAction,
    id = (Math.random() + 1).toString(36).substring(7),
    withNavigation = true,
    isDark = false,
    bg,
    classes = {},
    ref = $bindable(null),
    ...rest
  }: SvelteWidgetSwiperPhotoSliderProps = $props();
</script>

<WidgetWrapper
  {id}
  {isDark}
  {bg}
  containerClass={cn('gallery', isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '', classes?.container ?? '')}
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

  {#if images.length > 0}
    <SwiperSlider {id} {withNavigation}>
      {#each images as image}
        <swiper-slide>
          <a
            href={image.src}
            target="_blank"
            class="group overflow-hidden rounded-md border-primary cursor-zoom-in block aspect-square"
          >
            <Image
              src={image.src}
              alt={image.alt || ''}
              widths={[400, 900]}
              width={400}
              sizes="(max-width: 900px) 400px, 900px"
              class="object-cover object-top w-full md:h-full group-hover:scale-105 transition duration-300"
            />
          </a>
        </swiper-slide>
      {/each}
    </SwiperSlider>
  {/if}

  {#if callToAction}
    <div class="flex justify-center mx-auto w-fit mt-8 md:mt-12 font-medium">
      <Button {...callToAction} />
    </div>
  {/if}
</WidgetWrapper>
