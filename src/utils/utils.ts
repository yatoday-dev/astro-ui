import { I18N } from 'vendor:config';

export const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(I18N?.language, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

/**
 * Formats a given Date object into a string using the specified formatter.
 *
 * @param {Date} date - The Date object to be formatted. If the argument is not provided or is invalid, an empty string will be returned.
 * @returns {string} The formatted date string if a valid Date object is provided; otherwise, returns an empty string.
 */
export const getFormattedDate = (date: Date): string => (date ? formatter.format(date) : '');

/**
 * Trims specific leading and trailing characters from a string.
 *
 * If no character is specified, the function returns the input string as is.
 *
 * @param {string} [str=''] - The input string to be trimmed. Defaults to an empty string if not provided.
 * @param {string} [ch] - The character to remove from the beginning and end of the string. Optional.
 * @returns {string} - The trimmed string with the specified characters removed from the start and end.
 */
export const trim = (str = '', ch?: string) => {
  let start = 0;
  let end = str.length || 0;
  while (start < end && str[start] === ch) {
    ++start;
  }
  while (end > start && str[end - 1] === ch) {
    --end;
  }
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

/**
 * Function to format a number in thousands (K) or millions (M) format depending on its value
 * The output number is rounded to one decimal place where applicable, and trailing ".0" is removed.
 *
 * @param {number} amount - The numeric value to be converted.
 * @returns {string} The converted string with shorthand notation for better readability.
 */
export const toUiAmount = (amount: number) => {
  if (!amount) {
    return '0';
  }

  let value: string;

  if (amount >= 1000000000) {
    const formattedNumber = (amount / 1000000000).toFixed(1);
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = `${parseInt(formattedNumber)}B`;
    } else {
      value = `${formattedNumber}B`;
    }
  } else if (amount >= 1000000) {
    const formattedNumber = (amount / 1000000).toFixed(1);
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = `${parseInt(formattedNumber)}M`;
    } else {
      value = `${formattedNumber}M`;
    }
  } else if (amount >= 1000) {
    const formattedNumber = (amount / 1000).toFixed(1);
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = `${parseInt(formattedNumber)}K`;
    } else {
      value = `${formattedNumber}K`;
    }
  } else {
    value = Number(amount).toFixed(0);
  }

  return value;
};
