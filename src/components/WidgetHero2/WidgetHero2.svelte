<script lang="ts">
  import type { SvelteWidgetHero2Props } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Button from '../Button/Button.svelte';

  let {
    title,
    subtitle,
    tagline,
    content,
    actions,
    image,
    position = 'center',
    id,
    isDark = false,
    classes = {},
    contentSlot,
    actionsSlot,
    imageSlot,
    bgSlot,
  }: SvelteWidgetHero2Props = $props();

  const { container: containerClass = '' } = classes;
</script>

<WidgetWrapper {id} {isDark} containerClass={`py-0 md:py-0 lg:py-0 ${containerClass as string}`} {bgSlot}>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
    <div class="py-12 md:py-20">
      <div class="text-center max-w-5xl mx-auto">
        {#if tagline}
          <p class="text-base text-muted-foreground font-bold tracking-wide uppercase">{@html tagline}</p>
        {/if}
        {#if title}
          <h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter font-heading">
            {@html title}
          </h1>
        {/if}
        <div class="max-w-3xl mx-auto">
          {#if subtitle}
            <p class="text-xl text-muted-foreground mt-4">{@html subtitle}</p>
          {/if}
          {#if actions || actionsSlot}
            <div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 mt-6">
              {#if actionsSlot}
                {@render actionsSlot()}
              {:else if Array.isArray(actions)}
                {#each actions as action}
                  <div class="flex w-full sm:w-auto">
                    <Button {...(action || {})} class="w-full sm:mb-0" />
                  </div>
                {/each}
              {:else if typeof actions === 'string'}
                {@html actions}
              {/if}
            </div>
          {/if}
        </div>
        {#if content}
          {@html content}
        {:else if contentSlot}
          {@render contentSlot()}
        {/if}
      </div>
      <div class="">
        {#if image || imageSlot}
          <div class="relative m-auto max-w-5xl mt-10 md:mt-16">
            {#if imageSlot}
              {@render imageSlot()}
            {:else if typeof image === 'string'}
              {@html image}
            {:else if image}
              <img
                class="mx-auto rounded-md w-full"
                src={image.src}
                alt={image.alt || ''}
                loading="eager"
                width={1024}
                height={576}
              />
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</WidgetWrapper>