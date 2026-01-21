<script lang="ts">
  import type { SvelteSwiperSliderProps } from './types';
  import { cn } from '../../utils';
  import { onMount } from 'svelte';

  let {
    id = (Math.random() + 1).toString(36).substring(7),
    withNavigation = true,
    classes = {},
    children,
  }: SvelteSwiperSliderProps = $props();

  onMount(async () => {
    const { register } = await import('swiper/element/bundle');
    register();
  });
</script>

<div class="relative">
  <swiper-container
    data-id={id}
    class={cn('opacity-100', classes?.swiper)}
    space-between="10"
    centered-slides="true"
    slides-per-view="1.2"
    prevent-clicks="true"
    prevent-clicks-propagation="true"
    threshold="10"
    touch-start-prevent-default="false"
    navigation={withNavigation
      ? JSON.stringify({
          nextEl: `#btn-next-${id}`,
          prevEl: `#btn-prev-${id}`,
        })
      : false}
    breakpoints={JSON.stringify({
      640: {
        slidesPerView: 2,
        centeredSlides: false,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        centeredSlides: false,
        spaceBetween: 20,
      },
    })}
  >
    {#if children}
      {@render children()}
    {/if}
  </swiper-container>

  {#if withNavigation}
    <button
      type="button"
      id={`btn-prev-${id}`}
      class="btn-shadow hidden md:flex items-center justify-center cursor-pointer absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white text-black rounded-full transition-opacity opacity-0"
    >
      <span class="w-7 h-7">‹</span>
    </button>
    <button
      type="button"
      id={`btn-next-${id}`}
      class="btn-shadow hidden md:flex items-center justify-center cursor-pointer absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white text-black rounded-full transition-opacity"
    >
      <span class="w-7 h-7">›</span>
    </button>
  {/if}
</div>
