import {
  validateCoordinateInput,
  validateMonetaryInput,
} from "../utils/helpers/helpers";
import { expect, test, describe } from "vitest";
import { coordinateEnum } from "../types/DeliveryTypes";

describe("Validate money regex check", () => {
  test("Double Digit, No decimal input", () => {
    expect(validateMonetaryInput("13")).toBe(true);
  });
  test("Single Digit, No decimal input", () => {
    expect(validateMonetaryInput("1")).toBe(true);
  });
  test("Zero", () => {
    expect(validateMonetaryInput("0")).toBe(true);
  });
  test("Decimal, tenth", () => {
    expect(validateMonetaryInput("0.1")).toBe(true);
  });
  test("Decimal, hundredth", () => {
    expect(validateMonetaryInput("0.01")).toBe(true);
  });
  test("Decimal, thousandth", () => {
    expect(validateMonetaryInput("0.001")).toBe(false);
  });
});

describe("Validate Coordinate LAT input", () => {
  test("Single digit coordinate input LAT", () => {
    expect(validateCoordinateInput("9", coordinateEnum.Latitude)).toBe(true);
  });
  test("Double digit coordinate input LAT", () => {
    expect(validateCoordinateInput("89", coordinateEnum.Latitude)).toBe(true);
  });
  test("Over 90 coordinate input LAT", () => {
    expect(validateCoordinateInput("99", coordinateEnum.Latitude)).toBe(false);
  });
  test("NEG Single digit coordinate input LAT", () => {
    expect(validateCoordinateInput("-9", coordinateEnum.Latitude)).toBe(true);
  });
  test("NEG Double digit coordinate input LAT", () => {
    expect(validateCoordinateInput("-89", coordinateEnum.Latitude)).toBe(true);
  });
  test("Over -90 digit coordinate input LAT", () => {
    expect(validateCoordinateInput("-99", coordinateEnum.Latitude)).toBe(false);
  });
});

describe("Validate Coordinate LON input", () => {
  test("Single digit coordinate input LON", () => {
    expect(validateCoordinateInput("9", coordinateEnum.Longitude)).toBe(true);
  });
  test("Double digit coordinate input LON", () => {
    expect(validateCoordinateInput("89", coordinateEnum.Longitude)).toBe(true);
  });
  test("Triple digit coordinate", () => {
    expect(validateCoordinateInput("175", coordinateEnum.Longitude));
  });
  test("Over 180 coordinate input LON", () => {
    expect(validateCoordinateInput("199", coordinateEnum.Longitude)).toBe(
      false,
    );
  });
  test("NEG Single digit coordinate input LON", () => {
    expect(validateCoordinateInput("-9", coordinateEnum.Longitude)).toBe(true);
  });
  test("NEG Double digit coordinate input LON", () => {
    expect(validateCoordinateInput("-89", coordinateEnum.Longitude)).toBe(true);
  });
  test("NEG Triple digit coordinate", () => {
    expect(validateCoordinateInput("-175", coordinateEnum.Longitude));
  });
  test("Over -180 digit coordinate input LON", () => {
    expect(validateCoordinateInput("-199", coordinateEnum.Longitude)).toBe(
      false,
    );
  });
  test("Decimal max over characters 8", () => {
    expect(
      validateCoordinateInput("5.123456789", coordinateEnum.Latitude),
    ).toBe(false);
  });
  test("Decimal characters 8", () => {
    expect(validateCoordinateInput("5.12345678", coordinateEnum.Latitude)).toBe(
      true,
    );
  });
});
