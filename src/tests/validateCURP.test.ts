import { validateCURP } from "..";

describe("validateCURP", () => {
	test("Should validate a valid CURP", () => {
		const curp = "OEVL921024MDFLRR07";
		expect(validateCURP(curp)).toBe(true);
	});

	test("Should validate a valid CURP", () => {
		const curp = "EOTN981127HNESLC06";
		expect(validateCURP(curp)).toBe(true);
	});

	test("Should invalidate an invalid CURP", () => {
		const curp = "INVALIDCURP12345";
		expect(validateCURP(curp)).toBe(false);
	});
});
