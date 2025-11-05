<script lang="ts">
  import type { SvelteImageGalleryIkeaProps } from './types';
  import { cn } from '~/utils';
  import { onMount } from 'svelte';
  import ZoomedImage from '../ZoomedImage/ZoomedImage.svelte';
  import Image from '../Image/Image.svelte';

  let {
    id = (Math.random() + 1).toString(36).substring(7),
    withNavigation = true,
    classes = {},
    images = [],
    height = '',
    ref = $bindable(null),
    ...rest
  }: SvelteImageGalleryIkeaProps = $props();

  const { container: containerClass = '', swiper: swiperClass = '', swiperThumb: swiperThumbClass = '' } = classes;

  onMount(async () => {
    const { register } = await import('swiper/element/bundle');
    const { on, get } = await import('~/utils');

    register();

    const init = () => {
      const elem = document.querySelector(`div[data-image-gallery-ikea="${id}"]`);
      if (!elem) return;

      // Find the Swiper containers
      const mainSwiperEl = document.getElementById(`swiper-main-${id}`);
      const thumbSwiperEl = document.getElementById(`swiper-thumb-${id}`);
      if (!mainSwiperEl || !thumbSwiperEl) return;

      mainSwiperEl.addEventListener('swiperafterinit', () => {
        (thumbSwiperEl as any)?.swiper.slides.forEach((slide: HTMLElement, index: number) => {
          slide.addEventListener('mouseenter', () => {
            (mainSwiperEl as any)?.swiper.slideTo(index);
          });
        });
      });

      // Thumb Slider navigation buttons
      const btnThumbPrev = get(`#btn-prev-${id}`) as HTMLButtonElement;
      const btnThumbNext = get(`#btn-next-${id}`) as HTMLButtonElement;
      thumbSwiperEl.addEventListener('swiperreachend', () => {
        btnThumbNext.disabled = true;
      });
      thumbSwiperEl.addEventListener('swiperreachbeginning', () => {
        btnThumbPrev.disabled = true;
      });
      thumbSwiperEl.addEventListener('swiperfromedge', () => {
        btnThumbPrev.disabled = false;
        btnThumbNext.disabled = false;
      });

      // Main Slider navigation buttons
      const btnPrev = get(`#btn-main-prev-${id}`) as HTMLButtonElement;
      const btnNext = get(`#btn-main-next-${id}`) as HTMLButtonElement;
      mainSwiperEl.addEventListener('swiperreachend', () => {
        btnNext.disabled = true;
      });
      mainSwiperEl.addEventListener('swiperreachbeginning', () => {
        btnPrev.disabled = true;
      });
      mainSwiperEl.addEventListener('swiperfromedge', () => {
        btnPrev.disabled = false;
        btnNext.disabled = false;
      });

      Object.assign(mainSwiperEl, {});
      (mainSwiperEl as any)?.initialize();
    };

    init();
    on(document, 'astro:after-swap', init);
  });
</script>

<style>
  :global(.swiper-thumb .swiper-slide-thumb-active) {
    opacity: 1;
    border: 1px solid #666;
  }
</style>

<div bind:this={ref} class={cn('@container relative', containerClass)} data-image-gallery-ikea={id} {...rest}>
  <div class="absolute left-0 top-0 z-20 hidden md:block group w-20">
    <!-- Thumb Slider -->
    <button
      disabled
      type="button"
      id={`btn-prev-${id}`}
      class="absolute top-0 left-1/2 -translate-x-1/2 transform -translate-y-1/3 btn-shadow opacity-0 group-hover:not-disabled:opacity-90 hover:not-disabled:opacity-100 hidden md:flex items-center justify-center cursor-pointer z-10 size-8 bg-black text-white dark:bg-white dark:text-black rounded-full"
    >
      <span class="size-7">▲</span>
    </button>
    <button
      type="button"
      id={`btn-next-${id}`}
      class="absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-1/3 btn-shadow opacity-0 group-hover:not-disabled:opacity-90 hover:not-disabled:opacity-100 hidden md:flex items-center justify-center cursor-pointer z-10 size-8 bg-black text-white dark:bg-white dark:text-black rounded-full"
    >
      <span class="size-7">▼</span>
    </button>

    <swiper-container
      id={`swiper-thumb-${id}`}
      data-id={id}
      direction="vertical"
      class={cn(`swiper-thumb border-box ${swiperThumbClass}`, height)}
      space-between="10"
      slides-per-view="auto"
      free-mode="true"
      watch-slides-progress="true"
      navigation={withNavigation
        ? JSON.stringify({
            nextEl: `#btn-next-${id}`,
            prevEl: `#btn-prev-${id}`,
          })
        : false}
    >
      {#each images as image}
        <swiper-slide class="cursor-pointer border border-input aspect-square size-20">
          <Image
            widths={[200, 400]}
            width={200}
            height={200}
            sizes="(max-width: 400px) 200px, 400px"
            layout="constrained"
            loading="lazy"
            decoding="async"
            {...image}
          />
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>

  <!-- Main slider -->
  <div class="md:pl-24">
    <div class="relative group">
      <swiper-container
        id={`swiper-main-${id}`}
        init="false"
        class={cn('', swiperClass, height)}
        thumbs-swiper={`#swiper-thumb-${id}`}
        speed="250"
        space-between="10"
        centered-slides="true"
        slides-per-view="1.2"
        navigation={withNavigation
          ? JSON.stringify({
              nextEl: `#btn-main-next-${id}`,
              prevEl: `#btn-main-prev-${id}`,
            })
          : false}
        breakpoints={JSON.stringify({
          640: {
            speed: 0,
            centeredSlides: false,
            slidesPerView: 1,
          },
        })}
      >
        {#each images as image}
          <swiper-slide>
            <ZoomedImage {...image} />
          </swiper-slide>
        {/each}
      </swiper-container>

      {#if withNavigation}
        <button
          type="button"
          id={`btn-main-prev-${id}`}
          class="btn-shadow opacity-0 group-hover:not-disabled:opacity-90 hover:not-disabled:opacity-100 hidden md:flex items-center justify-center cursor-pointer absolute left-5 top-1/2 -translate-y-1/2 z-10 size-12 bg-black text-white dark:bg-white dark:text-black rounded-full transition-opacity"
        >
          <span class="size-7">‹</span>
        </button>
        <button
          type="button"
          id={`btn-main-next-${id}`}
          class="btn-shadow opacity-0 group-hover:not-disabled:opacity-90 hover:not-disabled:opacity-100 hidden md:flex items-center justify-center cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 z-10 size-12 bg-black text-white dark:bg-white dark:text-black rounded-full transition-opacity"
        >
          <span class="size-7">›</span>
        </button>
      {/if}
    </div>
  </div>
</div>
