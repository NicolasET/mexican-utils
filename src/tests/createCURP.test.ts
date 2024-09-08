import { createCURP } from "..";

describe("createCURP", () => {
	test("Should create a valid CURP", () => {
		const curp = createCURP(
			"Larisa",
			"Olvera",
			"female",
			"ciudad_de_méxico",
			"1992-10-24",
			"Vargas",
		);
		expect(curp).toBe("OEVL921024MDFLRR07");
	});

	test("Should create a valid CURP", () => {
		const curp = createCURP(
			"Nicolás",
			"Escobar",
			"male",
			"no_especificado",
			"1998-11-27",
			"Téllez",
		);
		expect(curp).toBe("EOTN981127HNESLC06");
	});

	test("Should create a valid CURP", () => {
		const curp = createCURP(
			"Andrés Manuel",
			"López",
			"male",
			"tabasco",
			"1953-11-13",
			"Obrador",
		);
		expect(curp).toBe("LOOA531113HTCPBN07");
	});

	test("Should create a valid CURP", () => {
		const curp = createCURP(
			"Larisa",
			"Olvera",
			"female",
			"ciudad_de_méxico",
			new Date("1992-10-24"),
			"Vargas",
		);
		expect(curp).toBe("OEVL921024MDFLRR07");
	});

	test("Should create a valid CURP", () => {
		const curp = createCURP(
			"Nicolás",
			"Escobar",
			"male",
			"no_especificado",
			Date.parse("1998-11-27"),
			"Téllez",
		);
		expect(curp).toBe("EOTN981127HNESLC06");
	});

	test("Should create an invalid CURP", () => {
		const curp = createCURP(
			"Larisa",
			"Olvera",
			"male",
			"ciudad_de_méxico",
			"1992-10-24",
			"Vargas",
		);
		expect(curp).not.toBe("OEVL921024MDFLRR07");
	});

	test("Should return an error", () => {
		expect(() =>
			createCURP(
				"Larisa",
				"Olvera",
				"female",
				"ciudad_de_méxico",
				"24-10-1992",
				"Vargas",
			),
		).toThrow(
			new Error(
				"The date of birth is an invalid date or is in an invalid format.",
			),
		);
	});
});
