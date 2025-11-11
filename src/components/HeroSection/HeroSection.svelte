<script lang="ts">
  import { cn } from '~/utils';
  import Image from '../Image/Image.svelte';
  import Button from '../Button/Button.svelte';
  import type { SvelteHeroSectionProps } from './types';
  import type { ToAction, Image as ImageType } from '~/types';

  let {
    asHeader = 'h3',
    classes = {},
    image,
    title,
    description,
    callToAction,
    ref = $bindable(null),
    children,
    ...restProps
  }: SvelteHeroSectionProps = $props();

  const {
    container: containerClass = 'h-96',
    start: startClass = 'w-full',
    end: endClass = 'w-full',
    image: imageClass = '',
    content: contentClass = 'md:px-12 lg:px-20 xl:px-24',
    title: titleClass = '',
    description: descriptionClass = '',
    action: actionClass = '',
  } = classes;

  // Extract URL for image link
  const urlForImage = $derived(() => {
    if (Array.isArray(callToAction)) {
      const firstAction = callToAction[0];
      return typeof firstAction === 'string' ? firstAction : (firstAction as ToAction)?.href;
    }
    return typeof callToAction === 'string' ? callToAction : (callToAction as ToAction)?.href;
  });
</script>

<div
  bind:this={ref}
  class={cn(
    'overflow-hidden bg-zinc-700 text-zinc-200 dark:bg-card dark:text-card-foreground',
    containerClass
  )}
  {...restProps}
>
  <div class="flex flex-col-reverse justify-between md:flex-row h-full">
    <div class={cn('flex items-center justify-center', startClass)}>
      <div class={cn('p-6 w-full h-full md:h-auto', contentClass)}>
        {#if title && description}
          <div class="flex flex-col h-full">
            <div class="mb-6">
              <svelte:element
                this={asHeader}
                class={cn('text-base md:text-lg xl:text-2xl font-medium md:font-semibold mb-2', titleClass)}
              >
                {title}
              </svelte:element>
              <p class={cn('text-sm md:text-base xl:text-lg', descriptionClass)}>{description}</p>
            </div>

            {#if callToAction}
              <div class={cn('w-full flex items-center gap-2', actionClass)}>
                {#if Array.isArray(callToAction)}
                  {#each callToAction as action}
                    {#if typeof action === 'string'}
                      {@html action}
                    {:else}
                      <Button {...action} class="w-full sm:mb-0" />
                    {/if}
                  {/each}
                {:else if typeof callToAction === 'string'}
                  {@html callToAction}
                {:else}
                  <Button {...callToAction} class="w-full sm:mb-0" />
                {/if}
              </div>
            {/if}
          </div>
        {/if}

        {@render children?.()}
      </div>
    </div>
    <div class={cn('md:h-auto', endClass)}>
      {#if image}
        {#if typeof image === 'function'}
          {@render image()}
        {:else if urlForImage()}
          <a href={urlForImage()} class="group">
            {#if typeof image === 'string'}
              {@html image}
            {:else}
              <Image
                class={cn('w-full md:h-full bg-gray-400 dark:bg-slate-700', imageClass)}
                widths={[400, 900]}
                width={400}
                height={400}
                layout="cover"
                loading="lazy"
                decoding="async"
                {...(image as ImageType)}
              />
            {/if}
          </a>
        {:else if typeof image === 'string'}
          {@html image}
        {:else}
          <Image
            class={cn('w-full h-full', imageClass)}
            widths={[400, 900]}
            width={400}
            height={400}
            layout="cover"
            loading="lazy"
            decoding="async"
            {...(image as ImageType)}
          />
        {/if}
      {/if}
    </div>
  </div>
</div>
