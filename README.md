# MEXICAN-UTILS

[![npm version](https://badge.fury.io/js/mexican-utils.svg)](https://badge.fury.io/js/mexican-utils)
[![install size](https://packagephobia.now.sh/badge?p=mexican-utils)](https://packagephobia.com/result?p=mexican-utils)

### ES ![Mexico](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/mx.png "Mexico")

Esta es una librería diseñada para tener centralizadas todas las utilidades que suelen ser usadas para sistemas mexicanos, con opción de utilizar en _CommonJS_ o _ESM_.

## Instalación

```sh
npm install mexican-utils --save
```

## Uso

1. Crear un CURP

```typescript
import { createCURP } from "mexican-utils";

const CURP = createCURP(
  "Andrés Manuel", // Nombre
  "López", // Apellido paterno
  "male", // Género
  "tabasco", // Estado
  "1953-11-13", // Fecha de nacimiento (YYYY-MM-DD)
  "Obrador" // Apellido materno (opcional). Cadena de texto vacía por defecto
);

console.log(CURP);
// Resultado: "LOOA531113HTCPBN07"
```

2. Validar un CURP

```typescript
import { validateCURP } from "mexican-utils";

const isValidCURP = validateCURP("LOOA531113HTCPBN07");

console.log(isValidCURP);
// Resultado: true
```

## Fuentes

Esta librería está hecha tomando como ejemplo lo siguiente:

- **CURP:**

  - [DOF 18-10-2021](https://sre.gob.mx/component/phocadownload/category/2-marco-normativo?download=1116:instructivo-normativo-para-la-asignacion-de-la-clave-unica-de-registro-de-poblacion-dof-18-10-2021-texto-vigente)
  - [curp](https://www.npmjs.com/package/curp)
  - [curp-calculation](https://www.npmjs.com/package/curp-calculation)

- **RFC:** Trabajo en curso 🛠️

### EN ![United States](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/us.png "United States")

This is a library designed to have centralized all the utilities that are usually used for Mexican systems, with the option to use in _CommonJS_ or _ESM_.

## Installation

```sh
npm install mexican-utils --save
```

## Usage

1. Create a CURP

```typescript
import { createCURP } from "mexican-utils";

const CURP = createCURP(
  "Andrés Manuel", // Name
  "López", // Paternal surname
  "male", // Genre
  "tabasco", // State
  "1953-11-13", // Date of birth (YYYY-MM-DD)
  "Obrador" // Maternal surname (optional). Empty string by default
);

console.log(CURP);
// Output: "LOOA531113HTCPBN07"
```

2. Validate a CURP

```typescript
import { validateCURP } from "mexican-utils";

const isValidCURP = validateCURP("LOOA531113HTCPBN07");

console.log(isValidCURP);
// Output: true
```

## Sources

This library is built using the following as an example:

- **CURP:**

  - [DOF 18-10-2021](https://sre.gob.mx/component/phocadownload/category/2-marco-normativo?download=1116:instructivo-normativo-para-la-asignacion-de-la-clave-unica-de-registro-de-poblacion-dof-18-10-2021-texto-vigente)
  - [curp](https://www.npmjs.com/package/curp)
  - [curp-calculation](https://www.npmjs.com/package/curp-calculation)

- **RFC:** Work in progress 🛠️
