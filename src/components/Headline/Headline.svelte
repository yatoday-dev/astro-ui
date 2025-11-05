<script lang="ts">
  import { cn } from '~/utils';
  import type { SvelteHeadlineProps } from './types';

  let {
    title,
    subtitle,
    tagline,
    position = 'center',
    classes = {},
    as = 'h2',
    ref = $bindable(null),
    ...restProps
  }: SvelteHeadlineProps = $props();

  const {
    container: containerClass = '',
    title: titleClass = 'text-foreground',
    subtitle: subtitleClass = '',
    tagline: taglineClass = '',
  } = classes;
</script>

{#if title || subtitle || tagline}
  <div
    bind:this={ref}
    class={cn(
      'mb-8 md:mb-12',
      position === 'center' && 'text-center max-w-3xl md:mx-auto',
      position === 'left' && 'text-left max-w-3xl',
      position === 'right' && 'text-right',
      containerClass
    )}
    {...restProps}
  >
    {#if tagline}
      <p class={cn('text-sm md:text-base text-muted-foreground font-bold tracking-wide uppercase', taglineClass)}>
        {@html tagline}
      </p>
    {/if}

    {#if title}
      <svelte:element
        this={as}
        class={cn(
          'font-bold leading-tighter tracking-tighter font-heading text-heading text-2xl md:text-4xl',
          titleClass
        )}
      >
        {@html title}
      </svelte:element>
    {/if}

    {#if subtitle}
      <p class={cn('mt-1 md:mt-4 text-muted-foreground text-lg/6 md:text-xl', subtitleClass)}>
        {@html subtitle}
      </p>
    {/if}
  </div>
{/if}
