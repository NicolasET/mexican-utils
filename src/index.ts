import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
	calculateVerificationDigit,
	findFirstConsonant,
	type Gender,
	GENDERS,
	getPrimaryName,
	getSpecialChar,
	normalizeString,
	removeCompoundWords,
	replaceBadWords,
	replaceNonAlphabetic,
	type State,
	STATES,
} from "./utils";

dayjs.extend(customParseFormat);

/**
 * Creates a CURP (Clave Única de Registro de Población) based on the provided
 * personal information and birth date.
 * The CURP format follows specific rules regarding the arrangement of
 * letters and numbers based on the person's names, birth date, gender, and state.
 * @param {string} name The full name.
 * @param {string} paternalSurname The first surname (last name).
 * @param {Gender} gender The gender.
 * @param {State} state The state code.
 * @param {string | number | Date} birthDate The date of birth in YYYY-MM-DD format.
 * @param {string} [maternalSurname=""] The second surname (last name).
 * @returns {string} The generated CURP string.
 * @throws {Error} Throws an error if the date of birth has an incorrect format.
 */
export const createCURP = (
	name: string,
	paternalSurname: string,
	gender: Gender,
	state: State,
	birthDate: string | number | Date,
	maternalSurname = "",
) => {
	if (!dayjs(birthDate, "YYYY-MM-DD", true).isValid()) {
		throw new Error(
			"The date of birth is an invalid date or is in an invalid format.",
		);
	}
	const cName = removeCompoundWords(normalizeString(name).toUpperCase());
	const cPaternalSurname = removeCompoundWords(
		normalizeString(paternalSurname).toUpperCase(),
	);
	const cMaternalSurname = removeCompoundWords(
		normalizeString(maternalSurname).toUpperCase(),
	);

	const letterName = getPrimaryName(cName).charAt(0);

	const vowelPaternalSurname =
		cPaternalSurname
			.substring(1) // Skip the first character
			.match(/[AEIOU]/i)?.[0] || "X"; // Find the first vowel or return 'X' if none found

	const letterPaternalSurname =
		cPaternalSurname.charAt(0) === "Ñ" ? "X" : cPaternalSurname.charAt(0);
	let letterMaternalSurname = cMaternalSurname.charAt(0) || "X"; // If empty string (falsy)
	letterMaternalSurname =
		letterMaternalSurname === "Ñ" ? "X" : letterMaternalSurname;

	const firstCompositionJoin = [
		letterPaternalSurname,
		vowelPaternalSurname,
		letterMaternalSurname,
		letterName,
	].join("");
	const firstComposition = replaceBadWords(
		replaceNonAlphabetic(firstCompositionJoin),
	);

	const consonants = replaceNonAlphabetic(
		[
			findFirstConsonant(cPaternalSurname),
			findFirstConsonant(cMaternalSurname),
			findFirstConsonant(getPrimaryName(cName)),
		].join(""),
	);

	const parsedBirthDate = dayjs(birthDate);
	const day = parsedBirthDate.format("DD");
	const month = parsedBirthDate.format("MM");
	const year = parsedBirthDate.format("YY");
	const fullYear = parsedBirthDate.format("YYYY");

	const incompleteCURP = [
		firstComposition,
		year,
		month,
		day,
		GENDERS[gender],
		STATES[state],
		consonants,
		getSpecialChar(fullYear),
	].join("");
	return [incompleteCURP, calculateVerificationDigit(incompleteCURP)].join("");
};

/**
 * Validates a given CURP (Clave Única de Registro de Población).
 * @param {string} curp The CURP string to validate.
 * @returns {boolean} Returns true if the CURP is valid, otherwise false.
 */
export const validateCURP = (curp: string): boolean => {
	const regex =
		/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
	return regex.test(curp);
};
