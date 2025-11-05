<script lang="ts">
  import type { SvelteSiteVerificationProps } from './types';

  let {
    googleSiteVerificationId,
  }: SvelteSiteVerificationProps = $props();
</script>

{#if googleSiteVerificationId}
  <svelte:head>
    <meta name="google-site-verification" content={googleSiteVerificationId} />
  </svelte:head>
{/if}
