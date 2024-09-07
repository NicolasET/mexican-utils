export const GENDERS = {
  male: "H",
  female: "M",
} as const;

export type Gender = keyof typeof GENDERS;

export const STATES = {
  aguascalientes: "AS",
  baja_california: "BC",
  baja_california_sur: "BS",
  campeche: "CC",
  chiapas: "CS",
  chihuahua: "CH",
  ciudad_de_méxico: "DF",
  coahuila_de_zaragoza: "CL",
  colima: "CM",
  durango: "DG",
  guanajuato: "GT",
  guerrero: "GR",
  hidalgo: "HG",
  jalisco: "JC",
  méxico: "MC",
  michoacán_de_ocampo: "MN",
  morelos: "MS",
  nayarit: "NT",
  nuevo_león: "NL",
  oaxaca: "OC",
  puebla: "PL",
  querétaro: "QT",
  quintana_roo: "QR",
  san_luis_potosí: "SP",
  sinaloa: "SL",
  sonora: "SR",
  tabasco: "TC",
  tamaulipas: "TS",
  tlaxcala: "TL",
  veracruz_de_ignacio_de_la_llave: "VZ",
  yucatán: "YN",
  zacatecas: "ZS",
  no_especificado: "NE",
} as const;

export type State = keyof typeof STATES;

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
] as const;

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
} as const;

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
