<script lang="ts">
  import type { SvelteWidgetContentProps } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import Headline from '../Headline/Headline.svelte';
  import ItemGrid0 from '../ItemGrid0/ItemGrid0.svelte';
  import Card4 from '../Card4/Card4.svelte';
  import Button from '../Button/Button.svelte';
  import Image from '../Image/Image.svelte';
  import PointMap from '../PointMap/PointMap.svelte';
  import { cn } from '../../utils';
  import type { Image as ImageType } from '~/types';

  let {
    title,
    subtitle,
    tagline,
    content,
    callToAction,
    items = [],
    points = [],
    pointsDisplayMode = 'always',
    columns,
    image,
    isReversed = false,
    isAfterContent = false,
    defaultIcon = 'tabler:check',
    position = 'center',
    id,
    isDark = false,
    classes = {},
    bg,
    children,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetContentProps = $props();
</script>

<WidgetWrapper
  {id}
  {isDark}
  containerClass={cn(isAfterContent ? 'pt-4 md:pt-6 lg:pt-8' : '', classes?.container ?? '')}
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

  <div class={cn('md:flex', isReversed ? 'md:flex-row-reverse' : '', 'md:gap-16')}>
    <div class={cn("md:basis-1/2 self-center", classes?.start ?? '')}>
      {#if children}
        {@render children()}
      {/if}
      {#if content}
        <div class={cn('mb-12 text-lg', classes?.content ?? '')}>
          {#if typeof content === 'string'}
            {@html content}
          {:else}
            {@render content()}
          {/if}
        </div>
      {/if}

      {#if callToAction}
        <div class="-mt-12 mb-8">
          <Button variant="link" {...callToAction} />
        </div>
      {/if}

      <ItemGrid0 {columns} class="gap-6">
        {#each items as item}
          <Card4
            icon={defaultIcon}
            {...item}
            classes={{
              container: `gap-0 border-0 py-0 justify-start`,
              title: 'text-lg font-medium leading-6 dark:text-white ml-2 rtl:ml-0 rtl:mr-2',
              description: 'ml-2 rtl:ml-0 rtl:mr-2',
              icon: 'flex h-7 w-7 items-center justify-center rounded-full bg-green-600 dark:bg-green-700 text-gray-50 p-1',
              ...((classes?.items || {}) as Record<string, string>),
            }}
          />
        {/each}
      </ItemGrid0>
    </div>
    <div aria-hidden="true" class={cn("mt-10 md:mt-0 md:basis-1/2", classes?.end ?? '')}>
      {#if image}
        <div class={cn('relative m-auto max-w-4xl', classes?.image ?? '')}>
          <PointMap items={points} {pointsDisplayMode} classes={classes?.points}>
            {#if typeof image === 'string'}
              {@html image}
            {:else if typeof image === 'function'}
              {@render image()}
            {:else}
              <Image
                class="mx-auto w-full rounded-lg shadow-lg"
                width={500}
                height={500}
                widths={[400, 768]}
                sizes="(max-width: 768px) 100vw, 432px"
                {...image as ImageType}
              />
            {/if}
          </PointMap>
        </div>
      {/if}
    </div>
  </div>
</WidgetWrapper>
