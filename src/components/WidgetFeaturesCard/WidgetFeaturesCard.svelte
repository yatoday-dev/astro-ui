<script lang="ts">
  import type { SvelteWidgetFeaturesCardProps } from './types';
  import Card1 from '../Card1/Card1.svelte';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import ItemGrid0 from '../ItemGrid0/ItemGrid0.svelte';
  import Image from '../Image/Image.svelte';
  import { cn } from '~/utils';
  import type { Image as ImageType } from '~/types';

  let {
    via = Card1,
    viaGrid = ItemGrid0,
    title,
    subtitle,
    tagline,
    items = [],
    columns = 4,
    image,
    position = 'center',
    isBeforeContent,
    isAfterContent,
    id,
    isDark = false,
    classes = {},
    bg,
    children,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetFeaturesCardProps = $props();

  const Component = via;
  const ComponentGrid = viaGrid;
</script>

<WidgetWrapper
  {id}
  {isDark}
  containerClass={cn(
    isBeforeContent ? 'md:pb-8 lg:pb-12' : '',
    isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : '',
    classes?.container ?? ''
  )}
  {bg}
  bind:ref
  {...restProps}
>
  <Headline
    {title}
    {subtitle}
    {tagline}
    classes={classes?.headline}
    {position}
  />

  {#if image}
    <div aria-hidden="true" class={cn('aspect-w-16 aspect-h-7 mb-6')}>
      <div
        class={cn(
          'w-full h-80 object-cover overflow-hidden rounded-xl mx-auto bg-gray-500 shadow-lg',
          classes?.image
        )}
      >
        {#if typeof image === 'string'}
          {@html image}
        {:else if typeof image === 'function'}
          {@render image()}
        {:else}
          <Image
            class="w-full h-80 object-cover mx-auto bg-gray-500 shadow-lg"
            width="auto"
            height={320}
            widths={[400, 768]}
            layout="fullWidth"
            {...image as ImageType}
          />
        {/if}
      </div>
    </div>
  {/if}

  {#if children}
    {@render children()}
  {/if}

  <ComponentGrid {columns} class={classes?.grid ?? ''}>
    {#each items as item}
      <Component {...item} classes={{...(classes?.card || {}), ...(item?.classes || {})}} />
    {/each}
  </ComponentGrid>
</WidgetWrapper>
