<script lang="ts">
  import type { SvelteZoomedImageProps } from './types';
  import { cn } from '../../utils';
  import { onMount } from 'svelte';

  let {
    src,
    alt = '',
    class: className = '',
    ref = $bindable(null),
    width = 400,
    height = 400,
    loading = 'lazy',
    decoding = 'async',
    ...restProps
  }: SvelteZoomedImageProps = $props();

  let containerRef: HTMLDivElement;
  let zoomButtonRef: HTMLButtonElement;
  let imageRef: HTMLImageElement;
  let spanRef: HTMLElement;

  let zoomed = $state(false);
  let mousePosition = $state({ percentX: 0, percentY: 0 });

  onMount(() => {
    if (!containerRef || !zoomButtonRef || !imageRef) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { offsetWidth: width, offsetHeight: height } = containerRef;
      mousePosition.percentX = (event.offsetX / width) * 100;
      mousePosition.percentY = (event.offsetY / height) * 100;

      if (zoomed && zoomButtonRef) {
        zoomButtonRef.style.backgroundPosition = `${mousePosition.percentX}% ${mousePosition.percentY}%`;
        document.addEventListener('click', handleOutsideClick);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;

      const touch = event.touches[0];
      const { offsetWidth: width, offsetHeight: height } = containerRef;
      const rect = containerRef.getBoundingClientRect();

      mousePosition.percentX = ((touch.clientX - rect.left) / width) * 100;
      mousePosition.percentY = ((touch.clientY - rect.top) / height) * 100;

      if (zoomed && zoomButtonRef) {
        zoomButtonRef.style.backgroundPosition = `${mousePosition.percentX}% ${mousePosition.percentY}%`;
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
      }
    };

    const disableZoom = () => {
      zoomed = false;

      if (imageRef) imageRef.classList.remove('hidden');
      if (spanRef) spanRef.classList.remove('zoom-wrap');
      if (zoomButtonRef) {
        zoomButtonRef.classList.remove('cursor-zoom-out', 'bg-zoomed');
        zoomButtonRef.classList.add('cursor-zoom-in');
        zoomButtonRef.style.backgroundSize = '100%';
        zoomButtonRef.style.backgroundPosition = '0% 0%';
      }

      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.contains(event.target as Node)) {
        disableZoom();
      }
    };

    const toggleZoom = () => {
      zoomed = !zoomed;

      if (zoomed) {
        if (imageRef) imageRef.classList.add('hidden');
        if (spanRef) spanRef.classList.add('zoom-wrap');
        if (zoomButtonRef) {
          zoomButtonRef.classList.add('cursor-zoom-out', 'bg-zoomed');
          zoomButtonRef.classList.remove('cursor-zoom-in');
          zoomButtonRef.style.backgroundSize = '200%';
          zoomButtonRef.style.backgroundPosition = `${mousePosition.percentX}% ${mousePosition.percentY}%`;
        }
      } else {
        disableZoom();
      }
    };

    zoomButtonRef.addEventListener('click', toggleZoom);
    zoomButtonRef.addEventListener('mousemove', handleMouseMove);
    zoomButtonRef.addEventListener('touchmove', handleTouchMove);

    return () => {
      if (zoomButtonRef) {
        zoomButtonRef.removeEventListener('click', toggleZoom);
        zoomButtonRef.removeEventListener('mousemove', handleMouseMove);
        zoomButtonRef.removeEventListener('touchmove', handleTouchMove);
      }
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  });
</script>

<style>
  .zoom-wrap {
    padding-bottom: 100%;
    width: 100%;
    position: relative;
    height: auto;
    display: block;
    box-sizing: border-box;
  }

  .zoom-bg {
    background-size: 200%;
    background-repeat: no-repeat;
    will-change: background-position;
  }
</style>

<div bind:this={containerRef} class={cn('overflow-hidden', className)} data-yt-zoom-container {...restProps}>
  {#if src}
    <div class="relative block flex-none w-full h-full" data-yt-zoom-wrap>
      <button
        bind:this={zoomButtonRef}
        id="zoom-button"
        type="button"
        class={cn('zoom-bg block w-full h-full cursor-zoom-in')}
        tabindex="0"
        style={`background-image: url('${src}')`}
        data-yt-zoom-button
      >
        <span bind:this={spanRef}>
          <img
            bind:this={imageRef}
            {src}
            {alt}
            {width}
            {height}
            {loading}
            {decoding}
            class="w-full h-full object-cover"
            data-yt-zoom-image
          />
        </span>
      </button>
    </div>
  {/if}
</div>