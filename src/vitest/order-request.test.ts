import { expect, test, describe } from "vitest";
import { calculateFees, rawDistanceConvert } from "../utils/helpers/helpers";
import { ICalculateReceipt, ICalculateResult } from "../types/DeliveryTypes";
import { ErrorCodes } from "../types/ErrorTypes";

const buildNewMockData = ({
  distance,
  min,
  max,
  baseFeeMultiplier,
  distanceMultiplier,
  minCart,
  cart,
  baseFee,
}: {
  distance?: number;
  min?: number;
  max?: number;
  baseFeeMultiplier?: number;
  distanceMultiplier?: number;
  minCart?: number;
  cart?: number;
  baseFee?: number;
} = {}): ICalculateReceipt => {
  return {
    distance: distance ?? 1500,
    distanceRanges: [
      {
        min: min ?? 1000,
        max: max ?? 5000,
        a: baseFeeMultiplier ?? 200,
        b: distanceMultiplier ?? 5,
      },
    ],
    minCartValue: minCart ?? 50,
    cartValue: cart ?? 500,
    baseFee: baseFee ?? 190,
  };
};

const buildNewMockResult = (
  mockObject: ICalculateReceipt,
): ICalculateResult => {
  let deliveryMultiplier;
  for (const range of mockObject.distanceRanges) {
    if (mockObject.distance >= range.min && range.max >= mockObject.distance) {
      deliveryMultiplier = range;
    }
  }
  if (!deliveryMultiplier) return { error: ErrorCodes.RECEIPT_ERROR };
  const calculateDeliveryFee = () => {
    const baseFeeAdjusted = mockObject.baseFee + deliveryMultiplier.a;
    const deliveryFee = (deliveryMultiplier.b * mockObject.distance) / 10;
    return (deliveryFee + baseFeeAdjusted) / 100;
  };

  const calculateTotalPrice = (
    cartValue: number,
    distanceMultiplier: number,
    distance: number,
    baseFee: number,
    baseFeeMultiplier: number,
  ): number => {
    const baseFeeAdjusted = baseFee + baseFeeMultiplier;
    const distanceMulti = (distanceMultiplier * distance) / 10;
    const total = baseFeeAdjusted + distanceMulti + cartValue;
    return total / 100;
  };

  const mockResult: ICalculateResult = {
    result: {
      distance: rawDistanceConvert(mockObject.distance),
      cartValue: mockObject.cartValue / 100,
      deliveryFee: calculateDeliveryFee(),
      surCharge:
        mockObject.cartValue < mockObject.minCartValue
          ? mockObject.minCartValue - mockObject.cartValue
          : 0,
      TotalPrice: calculateTotalPrice(
        mockObject.cartValue,
        mockObject.distanceRanges[0].b,
        mockObject.distance,
        mockObject.baseFee,
        mockObject.distanceRanges[0].a,
      ),
    },
  };
  return mockResult;
};

const failingInstanceObject: ICalculateResult = {
  error: ErrorCodes.RECEIPT_ERROR,
};

describe("Calculation based on Venue", () => {
  test("Venue 1000 - 5000", () => {
    const obj = buildNewMockData();
    const result = buildNewMockResult(obj);
    expect(calculateFees(obj)).toStrictEqual(result);
  });
  test("Venue minCartVal = cartValue", () => {
    const obj = buildNewMockData({ minCart: 500, cart: 500 });
    const result = buildNewMockResult(obj);
    expect(calculateFees(obj)).toStrictEqual(result);
  });
  test("Delivery distance out of bounds of min", () => {
    const obj = buildNewMockData({ min: 1550 });
    expect(calculateFees(obj)).toStrictEqual(failingInstanceObject);
  });
  test("Delivery distance out of bounds of max", () => {
    const obj = buildNewMockData({ distance: 6000 });
    expect(calculateFees(obj)).toStrictEqual(failingInstanceObject);
  });
  test("Max is set to 0", () => {
    const obj = buildNewMockData({ max: 0 });
    expect(calculateFees(obj)).toStrictEqual(failingInstanceObject);
  });
  test("surCharge is charged and works correctly", () => {
    const obj = buildNewMockData({ minCart: 1000 });
    expect(calculateFees(obj).result?.surCharge).toBe(5);
  });
});
