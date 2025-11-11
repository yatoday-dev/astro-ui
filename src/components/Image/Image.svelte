<script lang="ts">
  import type { SvelteImageProps } from './types';

  let {
    src,
    alt = '',
    width,
    height,
    loading = 'lazy',
    decoding = 'async',
    class: className,
    layout = 'constrained',
    aspectRatio,
    ref = $bindable(null),
    ...restProps
  }: SvelteImageProps = $props();

  // Parse width and height to numbers if they're strings
  let parsedWidth = $derived(typeof width === 'string' ? parseInt(width) : width);
  let parsedHeight = $derived(typeof height === 'string' ? parseInt(height) : height);

  // Handle aspect ratio
  let computedHeight = $derived(() => {
    if (parsedHeight) return parsedHeight;
    if (aspectRatio && parsedWidth) {
      const ratio = typeof aspectRatio === 'string'
        ? parseFloat(aspectRatio.replace(':', '/').split('/').reduce((a, b) => `${parseFloat(a) / parseFloat(b)}`))
        : aspectRatio;
      return Math.floor(parsedWidth / ratio);
    }
    return undefined;
  });
</script>

{#if src}
  <img
    bind:this={ref}
    {src}
    {alt}
    width={parsedWidth}
    height={computedHeight()}
    {loading}
    {decoding}
    class={className}
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
    {...restProps}
  />
{/if}
