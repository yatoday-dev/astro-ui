/**
 * The width from which WidgetNavbar lays its links out in a row; below it they fold
 * into the burger menu. The default, `md`, is the navbar's original behaviour.
 *
 * Each breakpoint spells out every class that depends on it, in full: Tailwind only
 * generates the classes it reads in the source, so a prefix assembled at runtime would
 * produce none. `foldQuery` is the same width as a media query, for the menu script,
 * which closes the open menu when the window crosses it.
 */
const navbarBreakpoints = {
  sm: {
    row: 'sm:flex sm:justify-between',
    rowCenter: 'sm:grid sm:grid-cols-3 sm:items-center',
    toggle: 'flex items-center sm:hidden',
    nav: 'items-center w-full sm:w-auto hidden sm:flex sm:mx-5 text-default overflow-y-auto overflow-x-hidden sm:overflow-y-visible sm:overflow-x-auto sm:justify-self-center',
    list: 'flex flex-col sm:flex-row sm:self-center w-full sm:w-auto text-xl sm:text-[0.9375rem] tracking-[0.01rem] font-medium sm:justify-center',
    chevron: 'w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden sm:inline',
    dropdown: 'dropdown-menu rounded-sm sm:absolute pl-4 sm:pl-0 pb-1 sm:hidden font-medium sm:min-w-60',
    megaPanel:
      'dropdown-menu rounded-sm sm:absolute sm:left-0 sm:right-0 sm:top-full pl-4 sm:pl-0 pb-1 sm:pb-0 sm:hidden font-medium',
    megaGrid: 'sm:grid sm:grid-cols-[repeat(var(--mega-cols,3),minmax(0,1fr))] sm:gap-x-8 sm:gap-y-4 sm:p-8',
    megaColumn: 'py-2 sm:py-0',
    megaLink: 'group flex items-start gap-3 rounded-md py-2 px-3 -mx-3 sm:px-2 sm:-mx-2',
    actions:
      'hidden sm:self-center sm:flex items-center sm:mb-0 fixed w-full sm:w-auto sm:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 sm:p-0 sm:justify-self-end',
    actionsInner: 'items-center flex justify-between w-full sm:w-auto',
    darkModeIcon: 'w-6 h-6 sm:w-5 sm:h-5 sm:inline-block',
    action: 'ml-2 py-2.5 px-5.5 sm:px-6 font-semibold shadow-none text-sm w-auto',
    dropdownSurface: 'bg-background text-foreground sm:shadow-lg',
    pinned: 'bg-background sm:bg-background/90 sm:backdrop-blur-md',
    foldQuery: '(width < 40rem)',
  },
  md: {
    row: 'md:flex md:justify-between',
    rowCenter: 'md:grid md:grid-cols-3 md:items-center',
    toggle: 'flex items-center md:hidden',
    nav: 'items-center w-full md:w-auto hidden md:flex md:mx-5 text-default overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:justify-self-center',
    list: 'flex flex-col md:flex-row md:self-center w-full md:w-auto text-xl md:text-[0.9375rem] tracking-[0.01rem] font-medium md:justify-center',
    chevron: 'w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline',
    dropdown: 'dropdown-menu rounded-sm md:absolute pl-4 md:pl-0 pb-1 md:hidden font-medium md:min-w-60',
    megaPanel:
      'dropdown-menu rounded-sm md:absolute md:left-0 md:right-0 md:top-full pl-4 md:pl-0 pb-1 md:pb-0 md:hidden font-medium',
    megaGrid: 'md:grid md:grid-cols-[repeat(var(--mega-cols,3),minmax(0,1fr))] md:gap-x-8 md:gap-y-4 md:p-8',
    megaColumn: 'py-2 md:py-0',
    megaLink: 'group flex items-start gap-3 rounded-md py-2 px-3 -mx-3 md:px-2 md:-mx-2',
    actions:
      'hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0 md:justify-self-end',
    actionsInner: 'items-center flex justify-between w-full md:w-auto',
    darkModeIcon: 'w-6 h-6 md:w-5 md:h-5 md:inline-block',
    action: 'ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto',
    dropdownSurface: 'bg-background text-foreground md:shadow-lg',
    pinned: 'bg-background md:bg-background/90 md:backdrop-blur-md',
    foldQuery: '(width < 48rem)',
  },
  lg: {
    row: 'lg:flex lg:justify-between',
    rowCenter: 'lg:grid lg:grid-cols-3 lg:items-center',
    toggle: 'flex items-center lg:hidden',
    nav: 'items-center w-full lg:w-auto hidden lg:flex lg:mx-5 text-default overflow-y-auto overflow-x-hidden lg:overflow-y-visible lg:overflow-x-auto lg:justify-self-center',
    list: 'flex flex-col lg:flex-row lg:self-center w-full lg:w-auto text-xl lg:text-[0.9375rem] tracking-[0.01rem] font-medium lg:justify-center',
    chevron: 'w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden lg:inline',
    dropdown: 'dropdown-menu rounded-sm lg:absolute pl-4 lg:pl-0 pb-1 lg:hidden font-medium lg:min-w-60',
    megaPanel:
      'dropdown-menu rounded-sm lg:absolute lg:left-0 lg:right-0 lg:top-full pl-4 lg:pl-0 pb-1 lg:pb-0 lg:hidden font-medium',
    megaGrid: 'lg:grid lg:grid-cols-[repeat(var(--mega-cols,3),minmax(0,1fr))] lg:gap-x-8 lg:gap-y-4 lg:p-8',
    megaColumn: 'py-2 lg:py-0',
    megaLink: 'group flex items-start gap-3 rounded-md py-2 px-3 -mx-3 lg:px-2 lg:-mx-2',
    actions:
      'hidden lg:self-center lg:flex items-center lg:mb-0 fixed w-full lg:w-auto lg:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 lg:p-0 lg:justify-self-end',
    actionsInner: 'items-center flex justify-between w-full lg:w-auto',
    darkModeIcon: 'w-6 h-6 lg:w-5 lg:h-5 lg:inline-block',
    action: 'ml-2 py-2.5 px-5.5 lg:px-6 font-semibold shadow-none text-sm w-auto',
    dropdownSurface: 'bg-background text-foreground lg:shadow-lg',
    pinned: 'bg-background lg:bg-background/90 lg:backdrop-blur-md',
    foldQuery: '(width < 64rem)',
  },
  xl: {
    row: 'xl:flex xl:justify-between',
    rowCenter: 'xl:grid xl:grid-cols-3 xl:items-center',
    toggle: 'flex items-center xl:hidden',
    nav: 'items-center w-full xl:w-auto hidden xl:flex xl:mx-5 text-default overflow-y-auto overflow-x-hidden xl:overflow-y-visible xl:overflow-x-auto xl:justify-self-center',
    list: 'flex flex-col xl:flex-row xl:self-center w-full xl:w-auto text-xl xl:text-[0.9375rem] tracking-[0.01rem] font-medium xl:justify-center',
    chevron: 'w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden xl:inline',
    dropdown: 'dropdown-menu rounded-sm xl:absolute pl-4 xl:pl-0 pb-1 xl:hidden font-medium xl:min-w-60',
    megaPanel:
      'dropdown-menu rounded-sm xl:absolute xl:left-0 xl:right-0 xl:top-full pl-4 xl:pl-0 pb-1 xl:pb-0 xl:hidden font-medium',
    megaGrid: 'xl:grid xl:grid-cols-[repeat(var(--mega-cols,3),minmax(0,1fr))] xl:gap-x-8 xl:gap-y-4 xl:p-8',
    megaColumn: 'py-2 xl:py-0',
    megaLink: 'group flex items-start gap-3 rounded-md py-2 px-3 -mx-3 xl:px-2 xl:-mx-2',
    actions:
      'hidden xl:self-center xl:flex items-center xl:mb-0 fixed w-full xl:w-auto xl:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 xl:p-0 xl:justify-self-end',
    actionsInner: 'items-center flex justify-between w-full xl:w-auto',
    darkModeIcon: 'w-6 h-6 xl:w-5 xl:h-5 xl:inline-block',
    action: 'ml-2 py-2.5 px-5.5 xl:px-6 font-semibold shadow-none text-sm w-auto',
    dropdownSurface: 'bg-background text-foreground xl:shadow-lg',
    pinned: 'bg-background xl:bg-background/90 xl:backdrop-blur-md',
    foldQuery: '(width < 80rem)',
  },
} as const;

export type NavbarBreakpoint = keyof typeof navbarBreakpoints;

export default navbarBreakpoints;
