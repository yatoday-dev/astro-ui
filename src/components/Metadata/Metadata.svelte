<script lang="ts">
  import type { SvelteMetadataProps } from './types';

  let {
    title,
    titleTemplate,
    noindex,
    nofollow,
    robotsProps,
    description,
    canonical,
    mobileAlternate,
    languageAlternates,
    openGraph,
    facebook,
    twitter,
    additionalMetaTags,
    additionalLinkTags,
  }: SvelteMetadataProps = $props();

  let formattedTitle = $derived(
    title ? (titleTemplate ? titleTemplate.replace('%s', title) : title) : undefined
  );

  let robotsContent = $derived(() => {
    const content: string[] = [];
    if (typeof noindex !== 'undefined') {
      content.push(noindex ? 'noindex' : 'index');
    }
    if (typeof nofollow !== 'undefined') {
      content.push(nofollow ? 'nofollow' : 'follow');
    }
    if (robotsProps) {
      if (robotsProps.nosnippet) content.push('nosnippet');
      if (robotsProps.maxSnippet) content.push(`max-snippet:${robotsProps.maxSnippet}`);
      if (robotsProps.maxImagePreview) content.push(`max-image-preview:${robotsProps.maxImagePreview}`);
      if (robotsProps.maxVideoPreview) content.push(`max-video-preview:${robotsProps.maxVideoPreview}`);
      if (robotsProps.noarchive) content.push('noarchive');
      if (robotsProps.unavailableAfter) content.push(`unavailable_after:${robotsProps.unavailableAfter}`);
      if (robotsProps.noimageindex) content.push('noimageindex');
      if (robotsProps.notranslate) content.push('notranslate');
    }
    return content.length > 0 ? content.join(',') : undefined;
  });
</script>

<svelte:head>
  {#if formattedTitle}
    <title>{formattedTitle}</title>
  {/if}

  {#if description}
    <meta name="description" content={description} />
  {/if}

  {#if robotsContent()}
    <meta name="robots" content={robotsContent()} />
  {/if}

  {#if canonical}
    <link rel="canonical" href={canonical} />
  {/if}

  {#if mobileAlternate}
    <link rel="alternate" media={mobileAlternate.media} href={mobileAlternate.href} />
  {/if}

  {#if languageAlternates}
    {#each languageAlternates as alternate}
      <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
    {/each}
  {/if}

  {#if openGraph}
    {#if openGraph.url}
      <meta property="og:url" content={openGraph.url} />
    {/if}
    {#if openGraph.type}
      <meta property="og:type" content={openGraph.type} />
    {/if}
    {#if openGraph.title}
      <meta property="og:title" content={openGraph.title} />
    {:else if formattedTitle}
      <meta property="og:title" content={formattedTitle} />
    {/if}
    {#if openGraph.description}
      <meta property="og:description" content={openGraph.description} />
    {:else if description}
      <meta property="og:description" content={description} />
    {/if}
    {#if openGraph.site_name}
      <meta property="og:site_name" content={openGraph.site_name} />
    {/if}
    {#if openGraph.locale}
      <meta property="og:locale" content={openGraph.locale} />
    {/if}
    {#if openGraph.images}
      {#each openGraph.images as image}
        <meta property="og:image" content={image.url} />
        {#if image.alt}
          <meta property="og:image:alt" content={image.alt} />
        {/if}
        {#if image.secureUrl}
          <meta property="og:image:secure_url" content={image.secureUrl} />
        {/if}
        {#if image.type}
          <meta property="og:image:type" content={image.type} />
        {/if}
        {#if image.width}
          <meta property="og:image:width" content={String(image.width)} />
        {/if}
        {#if image.height}
          <meta property="og:image:height" content={String(image.height)} />
        {/if}
      {/each}
    {/if}
    {#if openGraph.videos}
      {#each openGraph.videos as video}
        <meta property="og:video" content={video.url} />
        {#if video.alt}
          <meta property="og:video:alt" content={video.alt} />
        {/if}
        {#if video.secureUrl}
          <meta property="og:video:secure_url" content={video.secureUrl} />
        {/if}
        {#if video.type}
          <meta property="og:video:type" content={video.type} />
        {/if}
        {#if video.width}
          <meta property="og:video:width" content={String(video.width)} />
        {/if}
        {#if video.height}
          <meta property="og:video:height" content={String(video.height)} />
        {/if}
      {/each}
    {/if}
  {/if}

  {#if twitter}
    {#if twitter.cardType}
      <meta name="twitter:card" content={twitter.cardType} />
    {/if}
    {#if twitter.site}
      <meta name="twitter:site" content={twitter.site} />
    {/if}
    {#if twitter.handle}
      <meta name="twitter:creator" content={twitter.handle} />
    {/if}
  {/if}

  {#if facebook?.appId}
    <meta property="fb:app_id" content={facebook.appId} />
  {/if}

  {#if additionalMetaTags}
    {#each additionalMetaTags as tag}
      {#if 'name' in tag && tag.name}
        <meta name={tag.name} content={tag.content} />
      {:else if 'property' in tag && tag.property}
        <meta property={tag.property} content={tag.content} />
      {:else if 'httpEquiv' in tag && tag.httpEquiv}
        <meta http-equiv={tag.httpEquiv} content={tag.content} />
      {/if}
    {/each}
  {/if}

  {#if additionalLinkTags}
    {#each additionalLinkTags as tag}
      <link
        rel={tag.rel}
        href={tag.href}
        sizes={tag.sizes}
        media={tag.media}
        type={tag.type}
        color={tag.color}
        as={tag.as}
        crossorigin={tag.crossOrigin}
      />
    {/each}
  {/if}
</svelte:head>
