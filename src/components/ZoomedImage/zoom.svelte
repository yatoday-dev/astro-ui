<script lang="ts">
  import { cn } from '../../utils';
  import { type Snippet } from 'svelte';

  type Props = {
    src: string,
    children: Snippet
  };

  let {
    src,
    children
  }: Props = $props();
  
  let w = $state();
  let h = $state();


  // Zoom
  interface PercentageXY {
    percentX: number;
    percentY: number;
  }

  let zoomed = $state<boolean>(false);
  let mousePositionOnImage = $state<PercentageXY>({
    percentX: 0,
    percentY: 0,
  });
  const handleMouseMove = (mouseEvent: MouseEvent) => {
    mousePositionOnImage.percentX = (mouseEvent.offsetX / Number(w)) * 100;
    mousePositionOnImage.percentY = (mouseEvent.offsetY / Number(h)) * 100;
  };
</script>

<style>
  .a {
    padding-bottom: 100%;
    width: 100%;
    position: relative;
    height: auto;
    display: block;
    box-sizing: border-box;
  }

  .bg-zoomed {
    background-size: 200%;
    background-repeat: no-repeat;
    will-change: background-position;
  }
</style>


<div class="relative block flex-none w-full h-full" bind:clientWidth={w} bind:clientHeight={h}>
  <button
    type="button"
    class={cn("bg-zoomed block w-full h-full cursor-zoom-in", !zoomed || 'cursor-zoom-out')}
    tabindex="0"
    onclick={() => (zoomed = !zoomed)}
    onmousemove={handleMouseMove}
    style="background-position: {mousePositionOnImage.percentX}% {mousePositionOnImage.percentY}%; background-image: url({src});"
  >
    <span class:a={zoomed}>
        {#if !zoomed}
          {@render children()}
        {/if}
    </span>
  </button>
</div>

