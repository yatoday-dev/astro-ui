<script lang="ts">
  import type { SvelteWidgetBrandsProps } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import Image from '../Image/Image.svelte';
  import { cn } from '../../utils';

  let {
    title,
    subtitle,
    tagline,
    icons = [],
    images = [],
    position = 'center',
    isAfterContent = false,
    id,
    isDark = false,
    classes = {},
    bg,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetBrandsProps = $props();
</script>

<WidgetWrapper
  {id}
  {isDark}
  containerClass={cn(isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '', classes?.container ?? '')}
  {bg}
  bind:ref
  {...restProps}
>
  <Headline {title} {subtitle} {tagline} {position} />

  <div class="flex flex-wrap justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24">
    {#each icons as icon}
      <span class={cn('py-3 lg:py-5 w-12 h-auto mx-auto sm:mx-0', classes?.icon ?? 'text-gray-500')} data-icon={icon}></span>
    {/each}
    {#each images as image}
      {#if image.src}
        <div class={cn('flex justify-center col-span-1 my-2 lg:my-4 py-1 px-3 rounded-md', classes?.image ?? '')}>
          <Image src={image.src} alt={image.alt || ''} class="max-h-12" width={120} height={48} layout="fixed" />
        </div>
      {/if}
    {/each}
  </div>
</WidgetWrapper>
