<script lang="ts">
  import type { SvelteBackgroundProps } from './types.ts';
  
  const {
    isDark,
    children,
    ...rest
  }: SvelteBackgroundProps = $props()
</script>

<div class:list={['absolute inset-0', { 'bg-dark dark:bg-transparent': isDark }]} {...rest}>
  {@render children?.()}
</div>
