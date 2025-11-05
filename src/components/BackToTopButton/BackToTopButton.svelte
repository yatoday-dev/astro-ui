<script lang="ts">
  import type { SvelteBackToTopButtonProps } from './types';
  import { onMount } from 'svelte';

  let {
    selector = '#header',
    scrollOffset = 450,
    iconSlot,
  }: SvelteBackToTopButtonProps = $props();

  let buttonRef: HTMLAnchorElement;
  let progressRef: SVGCircleElement;
  let showButton = $state(false);
  let strokeDashoffset = $state(0);

  onMount(() => {
    if (!buttonRef || !progressRef) return;

    let length = 0;
    if (document.documentElement.clientWidth > 100) {
      length = progressRef.getTotalLength() || 0;
    }

    const showProgress = () => {
      const scrollPercent =
        (document.body.scrollTop + document.documentElement.scrollTop) /
        (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      const draw = length * scrollPercent;
      strokeDashoffset = length - draw;
    };

    const handleScroll = () => {
      showButton = window.scrollY > scrollOffset;
      showProgress();
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      const targetEl = document.querySelector(selector);
      targetEl?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    window.addEventListener('scroll', handleScroll);
    buttonRef.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (buttonRef) {
        buttonRef.removeEventListener('click', handleClick);
      }
    };
  });
</script>

<style>
  .btn-scroll-top {
    --yt-btn-scroll-top-size: 2.5rem;

    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--yt-btn-scroll-top-size);
    height: var(--yt-btn-scroll-top-size);
    font-size: 1.25rem;
    text-decoration: none;
    box-shadow: 0 0.275rem 1.125rem rgba(18, 21, 25, 0.1);
    opacity: 0;
    transition:
      transform 0.25s ease-in-out,
      opacity 0.25s;
    transform: scale(0);
    border-radius: 50%;
  }

  .btn-scroll-top::before {
    position: absolute;
    top: 0.0625rem;
    left: 0.0625rem;
    width: calc(var(--yt-btn-scroll-top-size) - 0.125rem);
    height: calc(var(--yt-btn-scroll-top-size) - 0.125rem);
    border-radius: 50%;
    z-index: -1;
    content: '';
    background-color: var(--color-card);
  }

  .btn-scroll-top > svg {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(90deg);
  }

  .btn-scroll-top.show {
    transform: scale(1);
    opacity: 1;
  }
</style>

<a
  bind:this={buttonRef}
  class="btn-scroll-top text-card-foreground {showButton ? 'show' : ''}"
  href="javascript:void(0);"
  data-yt-scroll
  data-yt-scroll-offset={scrollOffset}
  data-yt-scroll-selector={selector}
>
  <svg viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle
      bind:this={progressRef}
      cx="20"
      cy="20"
      r="19"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-miterlimit="10"
      style="stroke-dashoffset: {strokeDashoffset}"
    ></circle>
  </svg>
  <span class="flex items-center justify-center">
    {#if iconSlot}
      {@render iconSlot()}
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    {/if}
  </span>
</a>
