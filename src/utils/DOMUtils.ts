import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names into a single string, merging Tailwind CSS classes as needed.
 *
 * @param {ClassValue[]} inputs - An array of class names or conditional class value mappings.
 * @return {string} Returns a string of combined and merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Toggles a class on a specified HTML element. If the class is present, it is removed; otherwise, it is added.
 *
 * @param {string} el - A string representing the selector of the HTML element.
 * @param {string} className - The class name to toggle on the element.
 * @return {void} This function does not return a value.
 */
export function toggleClass(el: string, className: string) {
  const element = document.querySelector(el);
  if (!element) {
    return;
  }

  element.classList.toggle(className);
}

/**
 * Adds a specified class to the given element.
 *
 * @param {string} el - The selector of the target element.
 * @param {string} className - The class name to be added to the element.
 * @return {void} Does not return a value.
 */
export function addClass(el: string, className: string): void {
  const element = get(el) as Element | null;
  if (!element) {
    return;
  }

  element.classList.add(className);
}

/**
 * Removes a CSS class from the specified HTML element.
 *
 * @param {string} el - The CSS selector of the element from which the class should be removed.
 * @param {string} className - The name of the CSS class to remove.
 * @return {void}
 */
export function removeClass(el: string, className: string): void {
  const element = get(el) as Element | null;
  if (!element) {
    return;
  }

  element.classList.remove(className);
}

/**
 * Retrieves one or multiple DOM elements based on the provided CSS selector.
 *
 * @param {string} selector - A string containing a CSS selector to match elements in the DOM.
 * @param {boolean} [all=false] - An optional boolean flag. If true, retrieves all matching elements using querySelectorAll.
 *                                 If false or omitted, retrieves only the first matching element using querySelector.
 * @returns {Element | NodeListOf<Element> | null} - Returns the first matching element, a NodeList of all matching elements,
 *                                                   or null if no match is found.
 */
export const get = (selector: string, all?: boolean): Element | NodeListOf<Element> | null => all
  ? document?.querySelectorAll(selector)
  : document?.querySelector(selector)

export const on = (
  selector: string | HTMLElement | Document,
  event: string,
  callback: any,
  all?: boolean
) => {
  if (all) {
    const elements = document.querySelectorAll(selector as string)

    elements?.forEach(element => {
      element.addEventListener(event, callback)
    })

    return
  }

  if (typeof selector === 'string') {
    (get(selector) as HTMLElement)?.addEventListener(event, callback)

    return
  }

  selector?.addEventListener(event, callback)
}
