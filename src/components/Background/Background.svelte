<script lang="ts">
  import { cn } from '~/utils';
  import type { SvelteBackgroundProps } from './types';

  let {
    isDark = false,
    children,
    ...restProps
  }: SvelteBackgroundProps = $props();
</script>

<div class={cn('absolute inset-0', isDark && 'bg-dark dark:bg-transparent')} {...restProps}>
  {@render children?.()}
</div>
