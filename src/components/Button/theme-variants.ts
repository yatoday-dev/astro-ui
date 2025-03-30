import { tv, type VariantProps } from 'tailwind-variants';

export const themeVariants = tv({
  base: 'btn ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  variants: {
    variant: {
      default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-transparent text-primary hover:bg-primary/10',
      ghost:
        'text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800',
      link: '!px-0 underline-offset-4 underline',
    },
    size: {
      default: 'px-6 sm:px-8 h-10 sm:h-12 rounded-(--radius-btn)',
      sm: 'h-8 px-4 text-xs sm:h-10 sm:px-6 sm:text-sm rounded-[calc(var(--radius-btn)-2px)]',
      lg: 'h-14 px-8 text-base sm:text-lg md:text-xl rounded-[calc(var(--radius-btn)+2px)]',
      icon: 'size-10 aspect-square [&>svg]:-ml-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ButtonVariant = VariantProps<typeof themeVariants>['variant'];
export type ButtonSize = VariantProps<typeof themeVariants>['size'];
