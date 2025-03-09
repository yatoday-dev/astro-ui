export const utilityTypes = `// Utility Types
export type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

declare module '@yatoday/astro-ui' {
  // DOMUtils.ts
  export const cn: (...inputs: ClassValue[]) => string
  export const toggleClass: (el: string, className: string) => void
  export const addClass: (el: string, className: string) => void
  export const removeClass: (el: string, className: string) => void
  export const get: (selector: string, all?: boolean) => Element | NodeListOf<Element> | null
  export const on: (selector: string | HTMLElement | Document, event: string, callback: any, all?: boolean) => void
  
  // utils.ts
  export const getFormattedDate = (date: Date) => string
  export const trim = (str: string, ch?: string) => string
  export const toUiAmount = (amount: number) => string
  
  // URLUtils.ts
  export const trimSlash = (s: number) => string
  export const createPath = (...params: string[]) => string
  export const cleanSlug = (text: string[]) => string
  export const getCanonical = (path: string) => string | URL
}
`;
