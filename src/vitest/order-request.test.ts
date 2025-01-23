import { expect, test, describe } from "vitest";
import { calculateFees, rawDistanceConvert } from "../utils/helpers/helpers";
import { ICalculateReceipt, ICalculateResult } from "../types/DeliveryTypes";

const mockData: ICalculateReceipt = {
  distance: 1500,
  distanceRanges: [
    {
      min: 100,
      max: 500,
      a: 200,
      b: 5,
    },
    {
      min: 1000,
      max: 5000,
      a: 400,
      b: 2,
    },
    {
      min: 50,
      max: 500,
      a: 200,
      b: 5,
    },
  ],
  minCartValue: 600,
  cartValue: 500,
  baseFee: 190,
};

const calculateDeliveryFee = (range: number) => {
  const baseFeeAdjusted = mockData.baseFee + mockData.distanceRanges[range].a;
  const deliveryFee =
    (mockData.distanceRanges[range].b * mockData.distance) / 10;
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
  const total = baseFeeAdjusted + distanceMulti + cartValue + 200;
  return total / 100;
};

const mockResult: ICalculateResult = {
  result: {
    distance: rawDistanceConvert(mockData.distance),
    cartValue: mockData.cartValue / 100,
    deliveryFee: calculateDeliveryFee(1),
    surCharge: 2,
    TotalPrice: calculateTotalPrice(
      mockData.cartValue,
      mockData.distanceRanges[1].b,
      mockData.distance,
      mockData.baseFee,
      mockData.distanceRanges[1].a,
    ),
  },
};

describe("Calculation based on Venue", () => {
  test("Venue 1000 - 5000", () => {
    expect(calculateFees(mockData)).toStrictEqual(mockResult);
  });
  test("Venue minCartVal = cartValue", () => {
    if (mockResult.result) {
      mockData.cartValue = 600;
      mockResult.result.TotalPrice = mockResult.result?.TotalPrice - 2;
      mockResult.result.surCharge = 0;
    }
    expect(calculateFees(mockData)).toStrictEqual(mockResult);
  });
});
