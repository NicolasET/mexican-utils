const GENDERS = {
  MALE: "H",
  FEMALE: "M",
} as const;

export type Gender = (typeof GENDERS)[keyof typeof GENDERS];

const STATES = {
  AGUASCALIENTES: "AS",
  BAJA_CALIFORNIA: "BC",
  BAJA_CALIFORNIA_SUR: "BS",
  CAMPECHE: "CC",
  COAHUILA: "CL",
  COLIMA: "CM",
  CHIAPAS: "CS",
  CHIHUAHUA: "CH",
  DISTRITO_FEDERAL: "DF",
  CDMX: "DF",
  DURANGO: "DG",
  GUANAJUATO: "GT",
  GUERRERO: "GR",
  HIDALGO: "HG",
  JALISCO: "JC",
  ESTADO_DE_MEXICO: "MC",
  NO_ESPECIFICADO: "NE",
  MICHOACAN: "MN",
  MORELOS: "MS",
  NAYARIT: "NT",
  NUEVO_LEON: "NL",
  OAXACA: "OC",
  PUEBLA: "PL",
  QUERETARO: "QT",
  QUINTANA_ROO: "QR",
  SAN_LUIS_POTOSI: "SP",
  SINALOA: "SL",
  SONORA: "SR",
  TABASCO: "TC",
  TAMAULIPAS: "TS",
  TLAXCALA: "TL",
  VERACRUZ: "VZ",
  YUCATAN: "YN",
  ZACATECAS: "ZS",
} as const;

export type State = (typeof STATES)[keyof typeof STATES];

const COMMON_NAMES = [
  "MARIA DEL ",
  "MARIA DE LOS ",
  "MARIA ",
  "JOSE DE ",
  "JOSE ",
  "MA. ",
  "MA ",
  "M. ",
  "J. ",
  "J ",
  "M ",
];

const BAD_WORDS: Record<string, string> = {
  BACA: "BXCA",
  BAKA: "BXKA",
  BUEI: "BXEI",
  BUEY: "BXEY",
  CACA: "CXCA",
  CACO: "CXCO",
  CAGA: "CXGA",
  CAGO: "CXGO",
  CAKA: "CXKA",
  CAKO: "CXKO",
  COGE: "CXGE",
  COGI: "CXGI",
  COJA: "CXJA",
  COJE: "CXJE",
  COJI: "CXJI",
  COJO: "CXJO",
  COLA: "CXLA",
  CULO: "CXLO",
  FALO: "FXLO",
  FETO: "FXTO",
  GETA: "GXTA",
  GUEI: "GXEI",
  GUEY: "GXEY",
  JETA: "JXTA",
  JOTO: "JXTO",
  KACA: "KXCA",
  KACO: "KXCO",
  KAGA: "KXGA",
  KAGO: "KXGO",
  KAKA: "KXKA",
  KAKO: "KXKO",
  KOGE: "KXGE",
  KOGI: "KXGI",
  KOJA: "KXJA",
  KOJE: "KXJE",
  KOJI: "KXJI",
  KOJO: "KXJO",
  KOLA: "KXLA",
  KULO: "KXLO",
  LILO: "LXLO",
  LOCA: "LXCA",
  LOCO: "LXCO",
  LOKA: "LXKA",
  LOKO: "LXKO",
  MAME: "MXME",
  MAMO: "MXMO",
  MEAR: "MXAR",
  MEAS: "MXAS",
  MEON: "MXON",
  MIAR: "MXAR",
  MION: "MXON",
  MOCO: "MXCO",
  MOKO: "MXKO",
  MULA: "MXLA",
  MULO: "MXLO",
  NACA: "NXCA",
  NACO: "NXCO",
  PEDA: "PXDA",
  PEDO: "PXDO",
  PENE: "PXNE",
  PIPI: "PXPI",
  PITO: "PXTO",
  POPO: "PXPO",
  PUTA: "PXTA",
  PUTO: "PXTO",
  QULO: "QXLO",
  RATA: "RXTA",
  ROBA: "RXBA",
  ROBE: "RXBE",
  ROBO: "RXBO",
  RUIN: "RXIN",
  SENO: "SXNO",
  TETA: "TXTA",
  VACA: "VXCA",
  VAGA: "VXGA",
  VAGO: "VXGO",
  VAKA: "VXKA",
  VUEI: "VXEI",
  VUEY: "VXEY",
  WUEI: "WXEI",
  WUEY: "WXEY",
};

/**
 * Removes propositions, contractions, or conjunctions from a compound name or surname
 * to calculate the CURP.
 * This function eliminates common Spanish prepositions (e.g., "DE", "DEL", "LA") that
 * should be ignored when processing compound names or surnames.
 * @param {string} input The compound name or surname to be adjusted.
 * @returns {string} The adjusted name or surname with propositions and conjunctions removed.
 */
export const removeCompoundWords = (input: string): string => {
  const compoundWords =
    /\b(DA|DAS|DE|DEL|DER|DI|DIE|DD|EL|LA|LOS|LAS|LE|LES|MAC|MC|VAN|VON|Y)\b/gi;

  // Replace all matched prepositions, conjunctions, and contractions and trim excess spaces
  return input.replace(compoundWords, "").replace(/\s+/g, " ").trim();
};

/**
 * Selects the valid first name to be used in CURP generation.
 * If the full name contains more than one given name and the first name is a common name
 * (e.g., "MARIA", "JOSE"), the second name will be used instead.
 * @param {string} name The full given name with multiple names separated by spaces.
 * @returns {string} The valid name to use for CURP generation.
 */
export const getPrimaryName = (name: string): string => {
  // Split the full name into individual names
  const names = name.split(/\s+/);

  // If there's only one name, return it
  if (names.length === 1) return names[0];

  // Check if the first name is a common name
  const isCommonName = COMMON_NAMES.some((commonName) =>
    name.startsWith(commonName)
  );

  // If the first name is common, return the second name, otherwise return the first
  return isCommonName ? names[1] : names[0];
};

/**
 * Replaces bad words with a predefined censored version.
 * If the input word matches a key in the `BAD_WORDS` list, it will be replaced by the corresponding value.
 * Otherwise, the original word is returned unchanged.
 * @param {string} word The word to check and potentially replace.
 * @returns {string} The censored version of the word if found, or the original word if not.
 */
export const replaceBadWords = (word: string): string => {
  return BAD_WORDS[word.toUpperCase()] || word;
};

export const getSpecialChar = (birthYear: string) => {
  return birthYear.startsWith("1") ? "0" : "A";
};

/**
 * Calculates the verification digit for a CURP.
 * The verification digit is used to validate the CURP.
 * @param {string} incompleteCURP A string containing the first 17 characters of the CURP.
 * @returns {string} Returns the verification digit (0-9) for the CURP.
 */
export const calculateVerificationDigit = (incompleteCURP: string): string => {
  const characterSet = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let sum = 0;

  for (let i = 0; i < 17; i++) {
    sum += characterSet.indexOf(incompleteCURP.charAt(i)) * (18 - i);
  }

  const verificationDigit = 10 - (sum % 10);
  return verificationDigit === 10 ? "0" : verificationDigit.toString();
};
