<script lang="ts">
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';
  import Icon from '@iconify/svelte';
  import type { DarkModeProps } from './types';

  export let label: DarkModeProps['label'] = 'Toggle between Dark and Light mode';
  export let class: DarkModeProps['class'] = 'dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5';
  export let iconClass: DarkModeProps['iconClass'] = 'w-6 h-6';
  export let iconName: DarkModeProps['iconName'] = 'tabler:sun';
  export let initialMode: DarkModeProps['initialMode'] = 'system';

  let root: HTMLElement;

  function applyTheme(theme: string) {
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  function initialize() {
    if ((initialMode && initialMode.endsWith(':only')) || (!localStorage.theme && initialMode !== 'system')) {
      applyTheme(initialMode.replace(':only', ''));
    } else if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  function toggleDarkMode() {
    if (initialMode.endsWith(':only')) {
      return;
    }
    root.classList.toggle('dark');
    localStorage.theme = root.classList.contains('dark') ? 'dark' : 'light';
  }

  onMount(() => {
    // Only run once
    if (!window.darkModeInitialized) {
      window.darkModeInitialized = true;

      root = document.documentElement;

      // Listen for view transitions (if using Astro)
      document.addEventListener('astro:after-swap', () => {
        initialize();
      });

      initialize();
    }
  });
</script>

{#if !initialMode.endsWith(':only')}
  <button
    type="button"
    class={twMerge('cursor-pointer inline-flex items-center', class)}
    aria-label={label}
    data-yt-toggle-color-scheme
    on:click={toggleDarkMode}
  >
    <slot>
      <Icon icon={iconName} class={iconClass} />
    </slot>
  </button>
{/if}
