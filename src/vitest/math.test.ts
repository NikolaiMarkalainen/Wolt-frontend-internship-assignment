import {
  convertMoneyFloatToInt,
  convertMoneyIntToFloat,
} from "../utils/helpers/helpers";
import { expect, test, describe } from "vitest";

describe("Convert float string to integer ", () => {
  test("2 decimal points", () => {
    expect(convertMoneyFloatToInt("13.20")).toBe(1320);
  });
  test("1 decimal point", () => {
    expect(convertMoneyFloatToInt("13.2")).toBe(1320);
  });
  test("no decimal points", () => {
    expect(convertMoneyFloatToInt("13")).toBe(1300);
  });
  test("0 frist", () => {
    expect(convertMoneyFloatToInt("13.08")).toBe(1308);
  });
  test("decimalpoint only, tenth", () => {
    expect(convertMoneyFloatToInt("0.1")).toBe(10);
  });
  test("decimalpoint only, hundredth", () => {
    expect(convertMoneyFloatToInt("0.01")).toBe(1);
  });
});

describe("Conver Integer to money Float", () => {
  test("Single digit integer", () => {
    expect(convertMoneyIntToFloat(1)).toBe(0.01);
  });
  test("Double digit integer", () => {
    expect(convertMoneyIntToFloat(10)).toBe(0.1);
  });
  test("Triple digit integer", () => {
    expect(convertMoneyIntToFloat(100)).toBe(1);
  });
  test("Long integer to float", () => {
    expect(convertMoneyIntToFloat(553.3953317760354)).toBe(5.5);
  });
});
