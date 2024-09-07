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

/**
 * Replaces non-alphabetic characters in a string with a specified replacement string.
 * @param {string} input The string to be processed.
 * @param {string} replacement The string to replace non-alphabetic characters with.
 * @returns {string} The processed string with non-alphabetic characters replaced by the specified replacement string.
 */
export const replaceNonAlphabetic = (input: string, replacement = "X") => {
  return input.replace(/[\d_\-./\\,]/g, replacement);
};

/**
 * Finds the first consonant in a string.
 * If no consonant is found, returns 'X'.
 * @param {string} input The input string to search for consonants.
 * @returns {string} The first consonant found or 'X' if no consonant is present.
 */
export const findFirstConsonant = (input: string): string => {
  const internalConsonant = input
    .substring(1) // Skip the first character
    .replace(/[AEIOU]/gi, "") // Remove vowels
    .charAt(0) // Get the first character (after removal)
    .trim(); // Trim any whitespace

  return internalConsonant === "" || internalConsonant === "Ñ"
    ? "X"
    : internalConsonant;
};
