import { createCURP } from "..";

describe("createCURP", () => {
  test("Should create a valid CURP", () => {
    const curp = createCURP(
      "Larisa",
      "Olvera",
      "M",
      "DF",
      "1992-10-24",
      "Vargas"
    );
    expect(curp).toBe("OEVL921024MDFLRR07");
  });

  test("Should create a valid CURP", () => {
    const curp = createCURP(
      "Nicolas",
      "Escobar",
      "H",
      "NE",
      "1998-11-27",
      "Tellez"
    );
    expect(curp).toBe("EOTN981127HNESLC06");
  });

  test("Should create an invalid CURP", () => {
    const curp = createCURP(
      "Larisa",
      "Olvera",
      "H",
      "DF",
      "1992-10-24",
      "Vargas"
    );
    expect(curp).not.toBe("OEVL921024MDFLRR07");
  });

  test("Should return an error", () => {
    expect(() =>
      createCURP("Larisa", "Olvera", "M", "DF", "24-10-1992", "Vargas")
    ).toThrow(
      new Error(
        "The date of birth is an invalid date or is in an invalid format."
      )
    );
  });
});
