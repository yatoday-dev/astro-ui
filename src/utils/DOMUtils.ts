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
 * Retrieves one or multiple DOM elements based on the provided CSS selector.
 *
 * @param {string} selector - A string containing a CSS selector to match elements in the DOM.
 * @param {boolean} [all=false] - An optional boolean flag. If true, retrieves all matching elements using querySelectorAll.
 *                                 If false or omitted, retrieves only the first matching element using querySelector.
 * @returns {Element | NodeListOf<Element> | null} - Returns the first matching element, a NodeList of all matching elements,
 *                                                   or null if no match is found.
 */
export const get = (selector: string, all?: boolean): Element | NodeListOf<Element> | null =>
  all ? document?.querySelectorAll(selector) : document?.querySelector(selector);

export const on = (selector: string | HTMLElement | Document, event: string, callback: any, all?: boolean) => {
  if (all) {
    const elements = document.querySelectorAll(selector as string);

    elements?.forEach((element) => {
      element.addEventListener(event, callback(element, event));
    });

    return;
  }

  if (typeof selector === 'string') {
    const element = (get(selector) as HTMLElement);
    element?.addEventListener(event, callback(event, element));

    return;
  }

  selector?.addEventListener(event, callback(event, selector));
};

/**
 * Attaches an event listener to one or multiple DOM elements specified by the selector.
 *
 * @param {string | NodeListOf<Element>} selector - A CSS selector string or a NodeList containing DOM elements to attach the event listener to.
 * @param {string} event - The name of the event to listen for (e.g., 'click', 'mouseover').
 * @param {Function} callback - A callback function to execute when the event is triggered. It receives the event object and the element as arguments.
 * @return {void}
 */
export function attachEvent(selector: string | NodeListOf<Element>, event: string, callback: any) {
  const matches = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
  if (matches && matches.length) {
    matches.forEach((elem) => {
      elem.addEventListener(event, (e) => callback(e, elem), false);
    });
  }
}

/**
 * Toggles one or more CSS classes on a given HTML element.
 * toggleClasses(elem, "class1", "class2", "...");
 *
 * @param {HTMLElement} el - The target HTML element on which the CSS classes will be toggled.
 * @param {...string} cls - One or more CSS class names to be toggled on the target element.
 * @returns {void}
 */
export const toggleClasses = (el: HTMLElement | string, ...cls: string[]): void => {
  const element = typeof el === 'string' ? (get(el) as HTMLElement) : el;
  if (!element) {
    return;
  }
  
  cls.map(cl => element.classList.toggle(cl));
  return;
}

/**
 * Removes one or more CSS classes from a specified HTML element.
 * removeClasses(elem, "class1", "class2", "...");
 *
 * @param {HTMLElement} el - The HTML element from which the classes will be removed.
 * @param {...string} cls - One or more class names to be removed from the element.
 */
export const removeClasses = (el: HTMLElement | string, ...cls: string[]): void => {
  const element = typeof el === 'string' ? (get(el) as HTMLElement) : el;
  if (!element) {
    return;
  }

  cls.map(cl => element.classList.remove(cl));
  return;
}
  

/**
 * Adds one or more CSS class names to a specified HTML element.
 * addClasses(elem, "class1", "class2", "...");
 *
 * @param {HTMLElement} el - The HTML element to which the CSS class names will be added.
 * @param {...string} cls - One or more CSS class names to add to the element.
 * @returns {void[]} An array of undefined values, corresponding to the operations performed for each class name.
 */
export const addClasses = (el: HTMLElement | string, ...cls: string[]): void => {
  const element = typeof el === 'string' ? (get(el) as HTMLElement) : el;
  if (!element) {
    return;
  }

  cls.map(cl => element.classList.add(cl));
  return;
}
