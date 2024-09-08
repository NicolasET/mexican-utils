export * from "./curp-utils";

/**
 * Normalize a string by converting to lowercase and removing accents.
 * This function will remove diacritical marks (accents) and normalize the string
 * by transforming it to lowercase.
 * @param {string} input The string to normalize.
 * @returns {string} The normalized string.
 */
export const normalizeString = (input: string): string => {
	return (
		input
			.toLowerCase()
			.trim()
			.normalize("NFD") // Decompose combined graphemes into their component parts.
			// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
			.replace(/[\u0300-\u036f]/g, "")
	); // Remove diacritical marks (accents).
};

/**
 * Replaces non-alphabetic characters in a string with a specified replacement string.
 * @param {string} input The string to be processed.
 * @param {string} replacement The string to replace non-alphabetic characters with.
 * @returns {string} The processed string with non-alphabetic characters replaced by the specified replacement string.
 */
export const replaceNonAlphabetic = (
	input: string,
	replacement = "X",
): string => {
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

/**
 * Validates if the given argument is a valid date.
 * Accepts a string (in the format YYYY-MM-DD), a timestamp (number), or a Date object.
 * @param date - The date to validate, which can be a string, number, or Date.
 * @returns Whether the date is valid.
 */
export const isValidDate = (date: string | number | Date): boolean => {
	if (typeof date === "string") {
		const regex = /^\d{4}-\d{2}-\d{2}$/; // Check format YYYY-MM-DD
		if (!regex.test(date)) return false; // Format is invalid

		const parsedDate = new Date(`${date}T00:00:00Z`); // Append time in UTC to avoid local timezone issues
		return (
			parsedDate instanceof Date &&
			!Number.isNaN(parsedDate.getTime()) &&
			parsedDate.toISOString().startsWith(date)
		);
	}

	if (typeof date === "number") {
		const parsedDate = new Date(date);
		return !Number.isNaN(parsedDate.getTime());
	}

	if (date instanceof Date) {
		return !Number.isNaN(date.getTime());
	}

	return false; // If it's none of the above types, return false
};

/**
 * Parses a date and returns an object containing the day, month, year, and full year.
 * Accepts a string (in the format YYYY-MM-DD), a timestamp (number), or a Date object.
 * @param date - The birth date to parse.
 * @returns {{day: string, month: string, year: string, fullYear: string}} An object containing the day, month, year, and full year.
 */
export const parseDate = (
	date: string | number | Date,
): {
	day: string;
	month: string;
	year: string;
	fullYear: string;
} => {
	const parsedDate = new Date(date instanceof Date ? date.getTime() : date);
	const day = String(parsedDate.getUTCDate()).padStart(2, "0"); // Get day in UTC
	const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0"); // Month is zero-based; get in UTC
	const year = String(parsedDate.getUTCFullYear()).slice(-2); // Last 2 digits of year
	const fullYear = String(parsedDate.getUTCFullYear()); // Full year in UTC

	return { day, month, year, fullYear };
};
