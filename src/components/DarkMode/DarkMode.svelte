<script lang="ts">
  import { onMount } from 'svelte';
  import { cn } from '../../utils';
  import type { SvelteDarkModeProps } from './types';

  let {
    class: className = 'dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5',
    label = 'Toggle between Dark and Light mode',
    iconClass = 'w-6 h-6',
    iconName = 'tabler:sun',
    initialMode = 'system',
    ref = $bindable(null),
    children,
    ...restProps
  }: SvelteDarkModeProps = $props();

  const shouldRenderButton = !initialMode.endsWith(':only');

  function applyTheme(theme: string) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  function initialize() {
    const mode = initialMode;
    if ((mode && mode.endsWith(':only')) || (!localStorage.theme && mode !== 'system')) {
      applyTheme(mode.replace(':only', ''));
    } else if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  function handleToggle() {
    if (initialMode.endsWith(':only')) {
      return;
    }
    const root = document.documentElement;
    root.classList.toggle('dark');
    localStorage.theme = root.classList.contains('dark') ? 'dark' : 'light';
  }

  onMount(() => {
    // Only run once
    if (!(window as any).darkModeInitialized) {
      (window as any).darkModeInitialized = true;
      initialize();
    }
  });
</script>

{#if shouldRenderButton}
  <button
    bind:this={ref}
    type="button"
    class={cn('cursor-pointer inline-flex items-center', className)}
    aria-label={label}
    data-yt-toggle-color-scheme
    onclick={handleToggle}
    {...restProps}
  >
    {#if children}
      {@render children()}
    {:else}
      <span class={iconClass}>{iconName}</span>
    {/if}
  </button>
{/if}
