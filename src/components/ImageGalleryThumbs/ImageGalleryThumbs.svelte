<script lang="ts">
  import type { SvelteImageGalleryThumbsProps } from './types';
  import { cn } from '../../utils';
  import { onMount } from 'svelte';
  import Image from '../Image/Image.svelte';

  let {
    id = (Math.random() + 1).toString(36).substring(7),
    withNavigation = true,
    withFullscreen = true,
    withCounter = true,
    classes = {},
    images = [],
    height = '',
    ref = $bindable(null),
    ...rest
  }: SvelteImageGalleryThumbsProps = $props();

  const { container: containerClass = '', swiper: swiperClass = '', swiperThumb: swiperThumbClass = '' } = classes;

  const btnClass =
    'gallery-btn opacity-0 pointer-events-none group-hover:not-disabled:opacity-100 group-hover:pointer-events-auto focus-visible:opacity-100 transition-opacity items-center justify-center cursor-pointer absolute z-10 rounded-full border border-input bg-white/80 text-black disabled:cursor-default disabled:opacity-0';

  onMount(async () => {
    const { register } = await import('swiper/element/bundle');
    const { on, get } = await import('../../utils');

    register();

    const init = () => {
      const root = document.querySelector(`div[data-image-gallery-thumbs="${id}"]`) as HTMLElement | null;
      if (!root || root.dataset.initialized) return;

      const mainSwiperEl = document.getElementById(`swiper-main-${id}`);
      const thumbSwiperEl = document.getElementById(`swiper-thumb-${id}`);
      if (!mainSwiperEl || !thumbSwiperEl) return;

      // Fraction counter
      const counterCurrent = root.querySelector('.gallery-counter-current');
      mainSwiperEl.addEventListener('swiperslidechange', (e) => {
        const swiper = (e as CustomEvent).detail?.[0];
        if (swiper && counterCurrent) counterCurrent.textContent = String(swiper.activeIndex + 1);
      });

      // Main slider navigation buttons
      const btnPrev = get(`#btn-main-prev-${id}`) as HTMLButtonElement | null;
      const btnNext = get(`#btn-main-next-${id}`) as HTMLButtonElement | null;
      if (btnPrev && btnNext) {
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
      }

      const updateSwipers = () => {
        [mainSwiperEl, thumbSwiperEl].forEach((el) => {
          const s = (el as any)?.swiper;
          if (s && !s.destroyed) s.update();
        });
      };

      // Fullscreen: toggled with CSS only, so the same Swiper instances (and all
      // their animations / touch handling / thumbs sync) keep working.
      const btnFullscreen = get(`#btn-fullscreen-${id}`) as HTMLButtonElement | null;
      const btnClose = get(`#btn-close-${id}`) as HTMLButtonElement | null;
      if (btnFullscreen && btnClose) {
        const setFullscreen = (state: boolean) => {
          root.toggleAttribute('data-fullscreen', state);
          document.body.style.overflow = state ? 'hidden' : '';
          updateSwipers();
        };
        btnFullscreen.addEventListener('click', () => setFullscreen(true));
        btnClose.addEventListener('click', () => setFullscreen(false));
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && root.hasAttribute('data-fullscreen')) setFullscreen(false);
        });
        // Clicking the photo opens fullscreen; swiper.allowClick filters out drag ends
        mainSwiperEl.querySelectorAll('swiper-slide').forEach((slide) => {
          slide.addEventListener('click', () => {
            const s = (mainSwiperEl as any)?.swiper;
            if (s && s.allowClick && !root.hasAttribute('data-fullscreen')) setFullscreen(true);
          });
        });
      }

      // Link thumbs by passing the live Swiper instance as an element property.
      // A `thumbs-swiper` selector attribute is resolved by Swiper via a
      // requestAnimationFrame loop, which never runs in background/occluded
      // tabs — the gallery would come up unlinked and locked there.
      (thumbSwiperEl as any).initialize?.();
      (mainSwiperEl as any).thumbs = { swiper: (thumbSwiperEl as any).swiper };
      (mainSwiperEl as any)?.initialize();

      // Mark as initialized to show content and hide loader. The FOUC guard
      // hides all slides but the first until this attribute is set, so Swiper
      // measured a single slide during init — re-measure synchronously now
      // (no rAF: it doesn't fire in background tabs), and again as lazy
      // images resolve, otherwise watchOverflow locks the whole gallery on
      // machines where the images aren't already cached.
      root.setAttribute('data-initialized', 'true');
      updateSwipers();
      root.querySelectorAll('img').forEach((img) => {
        if (img.complete && img.naturalWidth > 0) return;
        img.addEventListener('load', updateSwipers, { once: true });
        img.addEventListener('error', updateSwipers, { once: true });
      });
    };

    init();
    on(document, 'astro:after-swap', init);
  });
</script>

<style>
  :global(.swiper-thumb .swiper-slide-thumb-active) {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  /* Hide slides before Swiper initializes to prevent FOUC */
  :global([data-image-gallery-thumbs]:not([data-initialized]) swiper-slide) {
    display: none;
  }
  :global([data-image-gallery-thumbs]:not([data-initialized]) swiper-slide:first-child) {
    display: block;
  }

  /* Hide loader after initialization */
  :global([data-image-gallery-thumbs][data-initialized] .gallery-loader) {
    display: none;
  }

  /* Loading spinner animation */
  @keyframes gallery-spin {
    to {
      transform: rotate(360deg);
    }
  }
  .gallery-spinner {
    animation: gallery-spin 1s linear infinite;
  }

  /* Fullscreen mode: the same sliders are re-laid-out as a fixed overlay, so every
     animation, touch gesture and the thumbs sync keep working without re-init. */
  :global([data-image-gallery-thumbs] .btn-close) {
    display: none;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .gallery-shell) {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 2.5rem 0;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .gallery-stage) {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
    border-radius: 0;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .gallery-stage swiper-container) {
    width: 100%;
    height: 100%;
    max-height: none;
    aspect-ratio: auto;
    background: transparent;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .gallery-stage swiper-slide) {
    cursor: default;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .swiper-thumb) {
    display: none;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .gallery-btn) {
    opacity: 1;
    pointer-events: auto;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .gallery-btn:disabled) {
    opacity: 0.35;
    pointer-events: none;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .btn-fullscreen) {
    display: none;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .btn-close) {
    display: flex;
  }
  :global([data-image-gallery-thumbs][data-fullscreen] .gallery-counter) {
    opacity: 1;
    color: #000;
    background: transparent;
  }
</style>

<div bind:this={ref} class={cn('relative', containerClass)} data-image-gallery-thumbs={id} {...rest}>
  <!-- Loading skeleton -->
  <div class="gallery-loader absolute inset-0 z-30 flex items-center justify-center bg-muted/50 rounded-lg">
    <div class="gallery-spinner size-10 border-4 border-muted-foreground/20 border-t-primary rounded-full"></div>
  </div>

  <div class="gallery-shell flex flex-col gap-3">
    <!-- Main slider -->
    <div class="gallery-stage relative group overflow-hidden rounded-lg">
      <swiper-container
        id={`swiper-main-${id}`}
        init="false"
        class={cn('w-full aspect-[3/2] max-h-[20rem] bg-muted', swiperClass, height)}
        speed="300"
        space-between="8"
        slides-per-view="1"
        grab-cursor="true"
        keyboard="true"
        navigation={withNavigation
          ? JSON.stringify({
              nextEl: `#btn-main-next-${id}`,
              prevEl: `#btn-main-prev-${id}`,
            })
          : false}
      >
        {#each images as image}
          <swiper-slide class={cn('bg-muted', withFullscreen && 'cursor-pointer')}>
            <Image
              width={800}
              height={533}
              loading="lazy"
              decoding="async"
              {...image}
              class={cn('w-full h-full object-contain', classes?.image)}
            />
          </swiper-slide>
        {/each}
      </swiper-container>

      {#if withNavigation}
        <button
          type="button"
          disabled
          id={`btn-main-prev-${id}`}
          aria-label="Previous image"
          class={cn(btnClass, 'hidden md:flex left-4 top-1/2 -translate-y-1/2 size-9')}
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6l6 6" /></svg>
        </button>
        <button
          type="button"
          id={`btn-main-next-${id}`}
          aria-label="Next image"
          class={cn(btnClass, 'hidden md:flex right-4 top-1/2 -translate-y-1/2 size-9')}
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6l-6 6" /></svg>
        </button>
      {/if}

      {#if withFullscreen}
        <button
          type="button"
          id={`btn-fullscreen-${id}`}
          aria-label="Open fullscreen"
          class={cn(btnClass, 'btn-fullscreen flex top-3 right-3 size-9')}
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>
        </button>
        <button
          type="button"
          id={`btn-close-${id}`}
          aria-label="Close fullscreen"
          class={cn(btnClass, 'btn-close top-3 right-3 size-9')}
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
        </button>
      {/if}

      {#if withCounter && images.length > 0}
        <div
          class="gallery-counter opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 text-white text-xs font-medium px-2.5 py-0.5"
        >
          <span class="gallery-counter-current">1</span>/{images.length}
        </div>
      {/if}
    </div>

    <!-- Thumbs slider -->
    <swiper-container
      id={`swiper-thumb-${id}`}
      class={cn('swiper-thumb w-full', swiperThumbClass)}
      space-between="8"
      slides-per-view="auto"
      free-mode="true"
      watch-slides-progress="true"
    >
      {#each images as image}
        <swiper-slide class="gallery-thumb cursor-pointer w-20 aspect-[16/10] rounded-md overflow-hidden bg-muted my-1 first:ml-1 last:mr-1">
          <Image width={160} height={100} loading="lazy" decoding="async" {...image} class="w-full h-full object-cover" />
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>
</div>
