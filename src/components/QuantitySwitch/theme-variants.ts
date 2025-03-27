import { tv, type VariantProps } from 'tailwind-variants';

export const themeVariants = tv({
  base: "relative break-word rounded-full",
  variants: {
    variant: {
      default: 'bg-secondary text-secondary-foreground',
      primary: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "shadow-input",
      accent: "bg-accent text-accent-foreground",
      ghost: "",
    },
    size: {
      default: "h-10 w-24 text-base",
      sm: "h-8 w-24 text-xs",
      lg: "h-12 w-26 px-8 text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const buttonVariants = tv({
  base: "text-inherit w-8 h-8 cursor-pointer p-0 relative transition-all inline-flex align-middle items-center justify-center",
  variants: {
    variant: {
      default: 'bg-secondary text-secondary-foreground hover:bg-foreground/10',
      primary: "bg-primary text-primary-foreground hover:bg-foreground/10",
      destructive: "bg-destructive text-destructive-foreground hover:bg-foreground/10",
      outline: "shadow-input hover:bg-background hover:bg-foreground/10",
      accent: "bg-accent text-accent-foreground hover:bg-foreground/10",
      ghost: "",
    },
    size: {
      default: "h-10",
      sm: "h-8",
      lg: "h-12",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type Variant = VariantProps<typeof themeVariants>["variant"];
export type Size = VariantProps<typeof themeVariants>["size"];
