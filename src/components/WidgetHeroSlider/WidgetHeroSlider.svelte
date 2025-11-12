<script lang="ts">
  import type { SvelteWidgetHeroSliderProps } from './types';
  import { cn } from '../../utils';
  import { onMount } from 'svelte';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import HeroSection from '../HeroSection/HeroSection.svelte';

  let {
    items = [],
    isAfterContent = false,
    id = (Math.random() + 1).toString(36).substring(7),
    height = 'h-[28rem]',
    withPagination = true,
    withNavigation = true,
    isDark = false,
    classes = {},
    bg,
    ref = $bindable(null),
    ...rest
  }: SvelteWidgetHeroSliderProps = $props();

  onMount(async () => {
    const { register } = await import('swiper/element/bundle');
    register();
  });
</script>

<style>
  :global(.btn-navigation:after),
  :global(.btn-navigation:before) {
    display: block;
    content: '';
    width: 10px;
    height: 2px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  :global(.btn-navigation:before) {
    transform: rotate(45deg) translate(-50%, -50%);
  }

  :global(.btn-navigation:after) {
    transform: rotate(-45deg) translate(-50%, -50%);
  }

  :global(.btn-prev) {
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
    left: 24px;
  }

  :global(.btn-next) {
    top: 50%;
    transform: translateY(-50%);
    right: 24px;
  }

  :global(swiper-container) {
    --swiper-theme-color: white;
    --swiper-pagination-bullet-size: 0.8rem;
    --swiper-pagination-bullet-border-radius: 50%;
    --swiper-pagination-bullet-inactive-color: hsla(0, 0%, 100%, 0.5);
    --swiper-pagination-bullet-inactive-opacity: 1;
    --swiper-pagination-bullet-horizontal-gap: 4px;
    --swiper-pagination-top: theme(spacing.4);
    --swiper-pagination-right: theme(spacing.12);

    display: block;
    transition: opacity;
  }

  /* pagination */
  :global(swiper-container::part(pagination)) {
    position: absolute;
    text-align: right;
    transition: 300ms opacity;
    transform: translate3d(0, 0, 0);
    z-index: 10;
    left: auto;
    right: var(--swiper-pagination-right, 1.5rem);
    top: var(--swiper-pagination-top, auto);
    bottom: var(--swiper-pagination-bottom, 1.5rem);
  }

  :global(swiper-container::part(bullet)),
  :global(swiper-container::part(bullet-active)) {
    width: var(--swiper-pagination-bullet-size, 8px);
    height: var(--swiper-pagination-bullet-size, 8px);
    display: inline-block;
    border-radius: var(--swiper-pagination-bullet-border-radius, 50%);
    background: var(--swiper-pagination-bullet-inactive-color, #000);
    opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
    margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);
  }

  :global(swiper-container::part(bullet):only-child) {
    display: none !important;
  }

  :global(swiper-container::part(bullet-active)) {
    opacity: var(--swiper-pagination-bullet-opacity, 1);
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
  }

  @media (width >= 48rem) {
    :global(swiper-container) {
      --swiper-pagination-top: auto;
      --swiper-pagination-bottom: theme(spacing.4);
      --swiper-pagination-right: theme(spacing.6);
    }
  }
</style>

<WidgetWrapper
  {id}
  {isDark}
  {bg}
  containerClass={cn(isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '', classes?.container ?? '')}
  bind:ref
  {...rest}
>
  <div class="relative md:rounded-xl overflow-hidden group">
    <swiper-container
      data-id={id}
      class={cn(classes?.swiper ?? '', height)}
      pagination={withPagination}
      centered-slides="true"
      space-between="10"
      slides-per-view="1.2"
      navigation={withNavigation
        ? JSON.stringify({
            nextEl: `#btn-next-${id}`,
            prevEl: `#btn-prev-${id}`,
          })
        : false}
      breakpoints={JSON.stringify({
        640: {
          centeredSlides: false,
          spaceBetween: 20,
          slidesPerView: 1,
        },
      })}
    >
      {#each items as item}
        <swiper-slide>
          <HeroSection
            {...item}
            classes={{ ...item?.classes, container: cn('rounded-xl', item?.classes?.container, height) }}
          />
        </swiper-slide>
      {/each}
    </swiper-container>

    {#if withNavigation}
      <button
        type="button"
        id={`btn-prev-${id}`}
        aria-label="Previous slide"
        class="btn-navigation btn-prev hidden lg:block cursor-pointer absolute z-10 w-10 h-10 bg-transparent border-2 border-white rounded-full shadow-sm transition-opacity opacity-20 hover:opacity-100 group-hover:opacity-100"
      ></button>
      <button
        type="button"
        id={`btn-next-${id}`}
        aria-label="Next slide"
        class="btn-navigation btn-next hidden lg:block cursor-pointer absolute z-10 w-10 h-10 bg-transparent border-2 border-white rounded-full shadow-sm transition-opacity opacity-20 hover:opacity-100 group-hover:opacity-100"
      ></button>
    {/if}

    <!-- Loading indicator -->
    <div class={cn('absolute top-0 left-0 w-full h-full flex items-center justify-center', classes?.loading ?? '')}>
      <svg class="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </div>
</WidgetWrapper>
