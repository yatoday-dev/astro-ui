<script lang="ts">
  import type {CopyToClipboardProps} from './types';
  import Button from '../Button/Button.svelte';
  import Copy from "lucide-svelte/icons/copy";
  import Check from "lucide-svelte/icons/check";
  import copyToClipboard from "./copy.ts";

  let {
    class: className = '',
    variant = 'outline',
    size = 'icon',
    ref = $bindable(null),
    text = undefined,
    type = 'button',
    children,
    ...restProps
  }: CopyToClipboardProps = $props();

  let showCheck = $state(false);

  /**
   * Copies the text passed as param to the system clipboard
   * Check if using HTTPS and navigator.clipboard is available
   * Then uses standard clipboard API, otherwise uses fallback
   */
  const copy = async (value: string) => {
    await copyToClipboard(value);
    
    showCheck = true;
    setTimeout(() => {
      showCheck = false;
    }, 3000);
  }
</script>

<Button
  type={type}
  class={className}
  variant={variant}
  size={size}
  onclick={() => copy(text)}
  {...restProps}
>
  {#if showCheck}
    <Check />
  {:else}
    <Copy />
  {/if}

</Button>
