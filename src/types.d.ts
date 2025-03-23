// Utility Types
export type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export type ToAction = {
  variant?: 'default' | 'primary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
} & Omit<HTMLAttributes<'a'>, 'slot'>;

export type Link = {
  href?: string;
  text?: string;
};

export type NameValue = {
  name?: string;
  value?: string;
};

export type Stat = {
  description?: number | string;
  title?: string;
  icon?: string;
};

declare module '@yatoday/astro-ui' {
  // DOMUtils.ts
  export const id: () => string;
  export const cn: (...inputs: ClassValue[]) => string;
  export const get: (selector: string, all?: boolean) => Element | NodeListOf<Element> | null;
  export const on: (selector: string | HTMLElement | Document, event: string, callback: any, all?: boolean) => void;
  export const attachEvent: (selector: string | NodeListOf<Element>, event: string, callback: any) => void;
  export const toggleClasses: (el: HTMLElement | string, ...cls: string[]) => void;
  export const removeClasses: (el: HTMLElement | string, ...cls: string[]) => void;
  export const addClasses: (el: HTMLElement | string, ...cls: string[]) => void;

  // utils.ts
  export const getFormattedDate = (date: Date) => string;
  export const trim = (str: string, ch?: string) => string;
  export const toUiAmount = (amount: number) => string;

  // URLUtils.ts
  export const trimSlash = (s: number) => string;
  export const createPath = (...params: string[]) => string;
  export const cleanSlug = (text: string[]) => string;
  export const getCanonical = (path: string) => string | URL;
}
