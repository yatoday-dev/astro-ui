<script lang="ts">
  import type { SvelteTimelineProps } from './types';
  import { cn } from '~/utils';

  let {
    items = [],
    classes = {},
    defaultIcon,
    iconSlots = {},
    defaultIconSlot,
  }: SvelteTimelineProps = $props();

  const {
    container: containerClass = '',
    panel: panelClass = '',
    title: titleClass = '',
    description: descriptionClass = '',
    icon: defaultIconClass = 'text-primary dark:text-slate-200 border-primary',
  } = classes;
</script>

{#if items && items.length > 0}
  <div class={containerClass}>
    {#each items as item, index}
      {@const itemClasses = item.classes || {}}
      <div class={cn('flex intersect-once intersect-quarter', panelClass, itemClasses?.panel)}>
        <div class="flex flex-col items-center mr-4 rtl:mr-0 rtl:ml-4">
          <div>
            <div class="flex items-center justify-center">
              {#if item.icon && iconSlots[`icon-${index}`]}
                <div class={cn('w-10 h-10 p-2 rounded-full border-2', defaultIconClass, itemClasses?.icon)}>
                  {@render iconSlots[`icon-${index}`]()}
                </div>
              {:else if defaultIconSlot}
                <div class={cn('w-10 h-10 p-2 rounded-full border-2', defaultIconClass, itemClasses?.icon)}>
                  {@render defaultIconSlot()}
                </div>
              {/if}
            </div>
          </div>
          {#if index !== items.length - 1}
            <div class="w-px h-full bg-black/10 dark:bg-slate-400/50"></div>
          {/if}
        </div>
        <div class={`pt-1 ${index !== items.length - 1 ? 'pb-8' : ''}`}>
          {#if item.title}
            <p class={cn('text-xl font-bold', titleClass, itemClasses?.title)}>
              {@html item.title}
            </p>
          {/if}
          {#if item.description}
            <p class={cn('text-muted-foreground mt-2', descriptionClass, itemClasses?.description)}>
              {@html item.description}
            </p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
{/if}