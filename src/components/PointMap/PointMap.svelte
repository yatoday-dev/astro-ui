<script lang="ts">
  import type { SveltePointMapProps } from './types';
  import { cn, id as generateId } from '~/utils';
  import Card7 from '../Card7/Card7.svelte';
  import { onMount } from 'svelte';

  let {
    via = Card7,
    items = [],
    pointsDisplayMode = 'always',
    classes = {},
    children,
  }: SveltePointMapProps = $props();

  const {
    container: containerClass = '',
    popup: popupClass = '',
  } = classes;

  const Component = via;
  const mapId = `map-${generateId()}`;

  onMount(() => {
    const mapContainer = document.getElementById(mapId);
    if (!mapContainer) return;

    const hotspotPoints = document.querySelectorAll(`.hotspot-point[data-map-id="${mapId}"]`);
    const popups = document.querySelectorAll(`.popup-content[data-map-id="${mapId}"]`) as NodeListOf<HTMLElement>;

    if (!hotspotPoints.length || !popups.length) return;

    hotspotPoints.forEach((point, index) => {
      if (point.hasAttribute('data-initially-open')) {
        showPopup(index);
      }
    });

    function showPopup(index: number) {
      popups.forEach((popup: HTMLElement, i) => {
        if (i === index) {
          popup.classList.remove('hidden');
        } else {
          popup.classList.add('hidden');
        }
      });
    }

    function hidePopup() {
      popups.forEach((popup: HTMLElement, index) => {
        const point = document.querySelector(`.hotspot-point[data-index="${index}"][data-map-id="${mapId}"]`);
        if (!point?.hasAttribute('data-initially-open')) {
          popup.classList.add('hidden');
        }
      });
    }

    function hideAllPopups() {
      popups.forEach(popup => popup.classList.add('hidden'));
    }

    hotspotPoints.forEach((point, index) => {
      point.addEventListener('mouseenter', () => {
        hideAllPopups();
        showPopup(index);
      });
      point.addEventListener('mouseleave', hidePopup);
      point.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllPopups();
        showPopup(index);
      });
    });

    mapContainer.addEventListener('mouseleave', () => {
      hideAllPopups();
      hotspotPoints.forEach((point, index) => {
        if (point.hasAttribute('data-initially-open')) {
          showPopup(index);
        }
      });
    });

    popups.forEach((popup: HTMLElement, index) => {
      popup.addEventListener('mouseenter', () => showPopup(index));
      popup.addEventListener('mouseleave', hidePopup);
      popup.addEventListener('click', (e) => {
        if (e.target === popup) hideAllPopups();
      });
    });
  });
</script>

<div id={mapId} class={cn(`map-picker relative h-full w-full points-${pointsDisplayMode}`, containerClass)}>
  {#each items as point, i}
    <button
      class="hotspot-point cursor-pointer"
      style={`left: ${point.x}%; top: ${point.y}%; width: 24px; height: 24px; transform: translate(-50%, -50%);`}
      data-index={i}
      data-map-id={mapId}
      aria-label={point.title}
      {...(point.isPopupOpen ? { 'data-initially-open': '' } : {})}
    >
    </button>

    <div
      class={cn("popup-content absolute rounded-md shadow-lg z-10 max-w-xs hidden", popupClass)}
      style={`left: ${point.x}%; top: ${point.y}%; transform: translate(${point.x > 50 ? '-100%' : '0'}, ${point.y > 50 ? '-100%' : '0'});`}
      data-popup={i}
      data-map-id={mapId}
    >
      <Component
        {...point}
        classes={{container: 'border-transparent dark:border-input', ...(classes?.card || {}), ...(point?.classes || {})}}
      />
    </div>
  {/each}

  <div class="w-full h-full">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style>
  :global(.map-picker) {
    max-width: 100%;
    display: block;
  }

  :global(.popup-content) {
    width: 250px;
    margin: 10px;
    transition: all 200ms ease-in-out;
  }

  :global(.points-hover .hotspot-point) {
    opacity: 0;
    visibility: hidden;
    transition: opacity 250ms ease-in-out, visibility 250ms ease-in-out;
  }

  :global(.points-hover:hover .hotspot-point),
  :global(.points-hover .hotspot-point[data-initially-open]) {
    opacity: 1;
    visibility: visible;
  }

  :global(.hotspot-point) {
    box-sizing: border-box;
    transition: border-color 250ms ease-in-out, opacity 250ms ease-in-out, visibility 250ms ease-in-out;
    transform: translateX(-1rem) translateY(-1rem) scale(0.999);
    padding: 0;
    width: 2rem;
    height: 2rem;
    border: 2px solid rgba(223, 223, 223, 0.75);
    background-clip: padding-box;
    position: absolute;
    background-color: rgba(17, 17, 17, 0.75);
    border-radius: 64px;
    line-height: .5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.hotspot-point::before) {
    content: "";
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    right: -0.5rem;
    bottom: -0.5rem;
    display: block;
  }

  :global(.hotspot-point::after) {
    content: "";
    position: relative;
    display: block;
    background: rgb(255, 255, 255);
    box-shadow: 0 1px 4px rgba(17, 17, 17, 0.55);
    width: .75rem;
    height: .75rem;
    border-radius: 64px;
    transition: transform 250ms ease-in-out;
  }

  :global(.hotspot-point:active), :global(.hotspot-point:hover) {
    background-color: rgba(17, 17, 17, 0.9);
  }

  :global(.hotspot-point:hover::after) {
    transform: scale(0.667);
  }
</style>
