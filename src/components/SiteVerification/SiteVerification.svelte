<script lang="ts">
  import type { SvelteSiteVerificationProps } from './types';

  let {
    googleSiteVerificationId,
  }: SvelteSiteVerificationProps = $props();
</script>

<svelte:head>
  {#if googleSiteVerificationId}
    <meta name="google-site-verification" content={googleSiteVerificationId} />
  {/if}
</svelte:head>
