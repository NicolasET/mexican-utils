export * from "./curp-utils";

/**
 * Normalize a string by converting to lowercase and removing accents.
 * This function will remove diacritical marks (accents) and normalize the string
 * by transforming it to lowercase.
 * @param {string} input The string to normalize.
 * @returns {string} The normalized string.
 */
export const normalizeString = (input: string) => {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD") // Decompose combined graphemes into their component parts.
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritical marks (accents).
};
