<script lang="ts">
  import type { SvelteAnalyticsProps } from './types';

  let {
    googleAnalyticsId,
    partytown = false,
  }: SvelteAnalyticsProps = $props();
</script>

{#if googleAnalyticsId}
  <svelte:head>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '{googleAnalyticsId}');
    </script>
  </svelte:head>
{/if}
