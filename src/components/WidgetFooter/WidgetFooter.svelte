<script lang="ts">
  import type { SvelteWidgetFooterProps } from './types';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import { cn } from '../../utils';

  let {
    socialLinks = [],
    secondaryLinks = [],
    links = [],
    note = '',
    classes = {},
    as = 'footer',
    isDark = false,
    bg,
    logo,
    subscribe,
    homeHref = '/',
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetFooterProps = $props();
</script>

<WidgetWrapper
  {isDark}
  {bg}
  {as}
  containerClass={cn('py-0 md:py-0 lg:py-0 border-t border-input not-prose', classes?.container)}
  bind:ref
  {...restProps}
>
  <div class={cn({ dark: isDark }, 'relative')}>
    <div class="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12">
      <div class="col-span-12 lg:col-span-4">
        <div class="mb-2">
          {#if logo}
            {@render logo()}
          {:else}
            <a class="inline-block font-medium text-xl" href={homeHref}>Logo</a>
          {/if}
        </div>
        <div class="text-sm text-muted-foreground flex gap-1">
          {#each secondaryLinks as { text, href }, index}
            {#if index !== 0}
              <span> · </span>
            {/if}
            <a
              class="hover:text-foreground hover:underline transition duration-150 ease-in-out"
              {href}
            >
              {@html text}
            </a>
          {/each}
        </div>

        {#if subscribe}
          {@render subscribe()}
        {/if}
      </div>
      {#each links as { title, links: linkList }}
        <div class="col-span-6 md:col-span-3 lg:col-span-2">
          <div class="text-foreground font-medium mb-2">{title}</div>
          {#if linkList && Array.isArray(linkList) && linkList.length > 0}
            <ul class="text-sm">
              {#each linkList as { text, href, ariaLabel, icon }}
                <li class="mb-2">
                  <a
                    class="text-muted-foreground hover:text-foreground hover:underline transition duration-150 ease-in-out inline-flex items-center gap-1.5"
                    {href}
                    aria-label={ariaLabel}
                  >
                    {#if icon}
                      <span class="w-4 h-4 flex-shrink-0" data-icon={icon}></span>
                    {/if}
                    {@html text}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>
    <div class="md:flex md:items-center md:justify-between py-6 md:py-8">
      {#if socialLinks?.length}
        <ul class="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0 rtl:ml-0 rtl:-mr-2 rtl:md:ml-0 rtl:md:mr-4">
          {#each socialLinks as { ariaLabel, href, text, icon }}
            <li>
              <a
                class="text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 focus:outline-hidden focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                aria-label={ariaLabel}
                {href}
              >
                {#if icon}
                  <span class="w-5 h-5" data-icon={icon}></span>
                {/if}
                {@html text}
              </a>
            </li>
          {/each}
        </ul>
      {/if}

      <div class="text-sm mr-4 text-gray-500">
        {@html note}
      </div>
    </div>
  </div>
</WidgetWrapper>
