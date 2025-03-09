<script lang="ts">
  import type {SvelteConditionalWrapperProps} from './types'

  const {
    condition,
    element = 'div',
    children,
    ...rest
  }: SvelteConditionalWrapperProps = $props()
</script>

{#if condition}
  <svelte:element this={element} {...rest}>
    {@render children?.()}
  </svelte:element>
{:else}
  {@render children?.()}
{/if}
