import slugify from '../utils/slugify';
import { trim } from './utils';

/**
 * Removes leading and trailing slashes from the given string.
 * If the input string contains slashes at the start and/or end,
 * they will be trimmed while preserving the rest of the content.
 *
 * @param {string} s - The input string to be processed.
 * @returns {string} - The input string with leading and trailing slashes removed.
 */
export const trimSlash = (s: string): string => trim(trim(s, '/'));

/**
 * Constructs a normalized URL path string by concatenating an arbitrary number of string parameters.
 * Removes extraneous slashes from input strings and ensures the resulting path starts and ends with a single slash.
 *
 * @param {...string} params - An array of string segments to be joined and normalized into a single path.
 * @returns {string} A normalized URL path starting and ending with a single slash.
 */
export const createPath = (...params: string[]): string => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (paths ? '/' : '');
};

/**
 * Transforms a given string into a cleaned slug format.
 *
 * The function removes leading and trailing slashes in the input string,
 * splits the string by slashes, applies slugification to each segment,
 * and rejoins the segments with slashes.
 *
 * @param {string} [text=''] - The input string to be transformed into a clean slug. Defaults to an empty string.
 * @returns {string} A cleaned slug string with each segment slugified and separated by slashes.
 */
export const cleanSlug = (text: string = ''): string =>
  trimSlash(text)
    .split('/')
    .map((a: string) => slugify(a).toLowerCase())
    .join('/');

/**
 * Processes a given path and returns its canonical form as a string or URL object.
 * Ensures that the resulting URL does not end with a trailing slash if the path is provided.
 *
 * @param {string} [path=''] - The input path to be converted to a canonical URL. Defaults to an empty string.
 * @returns {string | URL} The canonical representation of the URL. If the input path ends with a slash, it is removed.
 */
export const getCanonical = (path: string = ''): string | URL => {
  const url = String(new URL(path, 'https://example.com'));
  if (path && url.endsWith('/')) {
    return url.slice(0, -1);
  }

  return url;
};
