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

const commonNames = [
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
  const isCommonName = commonNames.some((commonName) =>
    name.startsWith(commonName)
  );

  // If the first name is common, return the second name, otherwise return the first
  return isCommonName ? names[1] : names[0];
};
