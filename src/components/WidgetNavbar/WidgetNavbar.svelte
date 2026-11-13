<script lang="ts">
  import type { SvelteWidgetNavbarProps } from './types';
  import { onMount } from 'svelte';
  import DarkMode from '../DarkMode/DarkMode.svelte';
  import Button from '../Button/Button.svelte';
  import WidgetWrapper from '../WidgetWrapper/WidgetWrapper.svelte';
  import navbarBreakpoints from './breakpoints';
  import { cn, trimSlash, setMenuToggleExpanded } from '../../utils';
  import { twMerge } from 'tailwind-merge';

  let {
    links = [],
    actions = [],
    isSticky = false,
    isDark = false,
    showToggleTheme = false,
    position = 'center',
    breakpoint = 'md',
    classes = {},
    scrollOffset = 60,
    as = 'header',
    toggleMenuLabel = 'Toggle Menu',
    bg,
    logo,
    toggleMenu,
    actionsSlot,
    ref = $bindable(null),
    ...restProps
  }: SvelteWidgetNavbarProps = $props();

  const bp = navbarBreakpoints[breakpoint];

  const {
    header: headerClass = '',
    container: containerClass = 'max-w-7xl 2xl:max-w-[96rem] md:mx-auto',
    links: linksClass = 'hover:text-link dark:hover:text-white',
    dropdown: dropdownClass = bp.dropdownSurface,
    dropdownLinks: dropdownLinksClass = 'hover:bg-black/10 hover:text-link dark:hover:text-white dark:hover:bg-white/10',
    darkModeIcon: darkModeIconClass = '',
    pinned: pinnedClasses = bp.pinned,
    unpinned: unpinnedClasses = '',
  } = classes;

  const currentPath = $derived(`/${trimSlash(typeof window !== 'undefined' ? window.location.pathname : '')}`);

  let headerElement = $state<HTMLElement | null>(null);

  function toggleClasses(elem: HTMLElement | null, ...classNames: string[]) {
    if (!elem) return;
    classNames.forEach((className) => elem.classList.toggle(className));
  }

  function addClasses(elem: HTMLElement | string | null, ...classNames: string[]) {
    if (typeof elem === 'string') {
      document.querySelectorAll(elem).forEach((el) => {
        classNames.forEach((className) => el.classList.add(className));
      });
    } else if (elem) {
      classNames.forEach((className) => elem.classList.add(className));
    }
  }

  function removeClasses(elem: HTMLElement | string | null, ...classNames: string[]) {
    if (typeof elem === 'string') {
      document.querySelectorAll(elem).forEach((el) => {
        classNames.forEach((className) => el.classList.remove(className));
      });
    } else if (elem) {
      classNames.forEach((className) => elem.classList.remove(className));
    }
  }

  onMount(() => {
    const header = document.querySelector('[data-yt-sticky-header]') as HTMLElement;
    if (!header) return;

    const scrollOffsetVal = Number(header.dataset.scrollOffset) || 0;
    const pinnedClassesVal = header.dataset.pinnedClasses || '';
    const unpinnedClassesVal = header.dataset.unpinnedClasses || '';

    let lastKnownScrollPosition = window.scrollY;
    let ticking = true;

    const handleToggleMenu = (e: Event) => {
      const elem = e.currentTarget as HTMLElement;
      setMenuToggleExpanded(elem, !elem.classList.contains('expanded'));
      toggleClasses(document.body, 'overflow-hidden');
      toggleClasses(document.getElementById('header'), 'h-screen', 'expanded');
      toggleClasses('[data-yt-sticky-header] nav' as any, 'hidden');
      toggleClasses('[data-yt-actions]' as any, 'hidden');
    };

    const hiddenNav = () => {
      setMenuToggleExpanded('[data-yt-toggle-menu]', false);
      removeClasses(document.body, 'overflow-hidden');
      removeClasses(document.getElementById('header'), 'h-screen', 'expanded');
      addClasses('[data-yt-sticky-header] nav', 'hidden');
      addClasses('[data-yt-actions]', 'hidden');
    };

    const applyHeaderStylesOnScroll = () => {
      if (lastKnownScrollPosition > scrollOffsetVal && !header.classList.contains('scroll')) {
        addClasses(header, 'scroll', ...pinnedClassesVal.split(' '));
        removeClasses(header, ...unpinnedClassesVal.split(' '));
      } else if (lastKnownScrollPosition <= scrollOffsetVal && header.classList.contains('scroll')) {
        removeClasses(header, 'scroll', ...pinnedClassesVal.split(' '));
        addClasses(header, ...unpinnedClassesVal.split(' '));
      }
      ticking = false;
    };
    applyHeaderStylesOnScroll();

    const toggleMenuEl = document.querySelector('[data-yt-toggle-menu]');
    if (toggleMenuEl) {
      toggleMenuEl.addEventListener('click', handleToggleMenu);
    }

    const navEl = document.querySelector('[data-yt-sticky-header] nav');
    if (navEl) {
      navEl.addEventListener('click', hiddenNav);
    }

    const mediaQuery = window.matchMedia(bp.foldQuery);
    mediaQuery.addEventListener('change', hiddenNav);

    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          applyHeaderStylesOnScroll();
        });
        ticking = true;
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      if (toggleMenuEl) {
        toggleMenuEl.removeEventListener('click', handleToggleMenu);
      }
      if (navEl) {
        navEl.removeEventListener('click', hiddenNav);
      }
      mediaQuery.removeEventListener('change', hiddenNav);
      document.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<WidgetWrapper
  id="header"
  {isDark}
  {bg}
  {as}
  class={cn(
    { sticky: isSticky, relative: !isSticky, dark: isDark },
    '-top-[1px] z-40 flex-none w-full transition-[opacity] ease-in-out',
    headerClass,
    unpinnedClasses
  )}
  containerClass={twMerge('py-0 md:py-0 lg:py-0', containerClass)}
  bind:ref={headerElement}
  {...(isSticky ? { 'data-yt-sticky-header': true } : {})}
  data-scroll-offset={scrollOffset}
  data-fold-query={bp.foldQuery}
  data-pinned-classes={pinnedClasses}
  data-unpinned-classes={unpinnedClasses}
  {...restProps}
>
  <div
    class={cn('relative text-default py-3 mx-auto w-full', position === 'center' ? bp.rowCenter : bp.row)}
  >
    <div class={cn({ 'mr-auto rtl:mr-0 rtl:ml-auto': position === 'right' }, 'flex justify-between items-center')}>
      {#if logo}
        {@render logo()}
      {:else}
        <span>Logo</span>
      {/if}
      <div class={bp.toggle}>
        {#if toggleMenu}
          {@render toggleMenu()}
        {:else}
          <button
            type="button"
            class="flex flex-col h-12 w-12 rounded-sm justify-center items-center cursor-pointer group"
            aria-label={toggleMenuLabel}
            aria-expanded="false"
            aria-controls="header-menu"
            data-yt-toggle-menu
          >
            <span class="sr-only">{toggleMenuLabel}</span>
            <span
              aria-hidden="true"
              class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:rotate-45 group-[.expanded]:translate-y-2.5"
            ></span>
            <span
              aria-hidden="true"
              class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:opacity-0"
            ></span>
            <span
              aria-hidden="true"
              class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:-rotate-45 group-[.expanded]:-translate-y-2.5"
            ></span>
          </button>
        {/if}
      </div>
    </div>
    <nav
      id="header-menu"
      class={bp.nav}
      aria-label="Main navigation"
    >
      <ul class={bp.list}>
        {#each links as { text, href, links: subLinks }}
          <li class={subLinks?.length ? 'dropdown' : ''}>
            {#if subLinks?.length}
              <button
                type="button"
                class={cn('px-4 py-3 flex items-center whitespace-nowrap cursor-pointer', linksClass)}
              >
                {text}
                <span class={bp.chevron}>▼</span>
              </button>
              <ul
                class={cn(bp.dropdown, dropdownClass)}
              >
                {#each subLinks as { text: text2, href: href2 }}
                  <li class="px-1">
                    <a
                      class={cn(
                        'first:rounded-t last:rounded-b py-2 px-5 block whitespace-no-wrap',
                        { 'link-active': href2 === currentPath },
                        dropdownLinksClass
                      )}
                      href={href2}
                    >
                      {text2}
                    </a>
                  </li>
                {/each}
              </ul>
            {:else}
              <a
                class={cn('px-4 py-3 flex items-center whitespace-nowrap', { 'link-active': href === currentPath }, linksClass)}
                {href}
              >
                {text}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </nav>
    <div
      class={cn(
        { 'ml-auto rtl:ml-0 rtl:mr-auto': position === 'left' },
        bp.actions
      )}
      data-yt-actions
    >
      <div class={bp.actionsInner}>
        <div class="flex">
          {#if showToggleTheme}
            <DarkMode iconClass={cn(bp.darkModeIcon, darkModeIconClass)} />
          {/if}
        </div>

        {#if actionsSlot}
          {@render actionsSlot()}
        {:else if actions?.length}
          <span class="ml-4 rtl:ml-0 rtl:mr-4">
            {#each actions as btnProps}
              <Button {...btnProps} class={bp.action} />
            {/each}
          </span>
        {/if}
      </div>
    </div>
  </div>
</WidgetWrapper>

<style>
  :global(#header.expanded nav) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 70px !important;
    padding: 0 5px;
  }

  :global(.dropdown:focus .dropdown-menu),
  :global(.dropdown:focus-within .dropdown-menu),
  :global(.dropdown:hover .dropdown-menu) {
    display: block;
  }
</style>
