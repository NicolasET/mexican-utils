import {
  Gender,
  getPrimaryName,
  normalizeString,
  removeCompoundWords,
  State,
} from "./utils";

const createCURP = (
  name: string,
  paternalSurname: string,
  maternalSurname = "",
  gender: Gender,
  state: State
) => {
  const cName = removeCompoundWords(normalizeString(name).toUpperCase());
  const cPaternalSurname = removeCompoundWords(
    normalizeString(paternalSurname).toUpperCase()
  );
  const cMaternalSurname = removeCompoundWords(
    normalizeString(maternalSurname).toUpperCase()
  );

  const letterName = getPrimaryName(cName).charAt(0);
  const vowelPaternalSurname =
    cPaternalSurname
      .substring(1) // Skip the first character
      .match(/[AEIOU]/i)?.[0] || "X"; // Find the first vowel or return 'X' if none found

  const letterPaternalSurname =
    cPaternalSurname.charAt(0) === "Ñ" ? "X" : cPaternalSurname.charAt(0);
  let letterMaternalSurname = maternalSurname.charAt(0) || "X";
  letterMaternalSurname =
    letterMaternalSurname === "Ñ" ? "X" : letterMaternalSurname;
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
