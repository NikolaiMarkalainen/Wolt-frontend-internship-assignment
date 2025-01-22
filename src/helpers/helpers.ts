import {
  coordinateEnum,
  ICalculateReceipt,
  ICalculateResult,
  ICoordinates,
  IReceipt,
} from "../types/DeliveryTypes";
import { ErrorCodes } from "../types/ErrorTypes";
import strings from "../localization";
import { store } from "../store/store";
export const validateMonetaryInput = (input: string): boolean => {
  /* digits + decimal seperator dot or comma and only two digits at the end */
  const regex = new RegExp("^\\d+([.|,]{1}(\\d{1,2})?)?$");
  return regex.test(input);
};

export const validateCoordinateInput = (
  input: string,
  coordinateDirection: coordinateEnum,
): boolean => {
  if (input === undefined) {
    return true;
  }
  // Regex checks allow + - at start with -90 to 90 or -180 to 180 with 7 decimal points and a dot seperator for it depending on param
  if (coordinateDirection === coordinateEnum.Latitude) {
    const regex = new RegExp(
      "^([-,+]?)(([0-8]?\\d|90)([.]{1}?(\\d{1,8})?)?)?$",
    );
    return regex.test(input);
  }
  if (coordinateDirection === coordinateEnum.Longitude) {
    const regex = new RegExp(
      "^([-,+]?)(([0-9]{1,2}|1[1-7][1-9]|180)([.]{1}?(\\d{1,8})?)?)?$",
    );
    return regex.test(input);
  }
  return false;
};
// Law of Haversines, birds flight
export const coordinateDistanceCalc = (
  businessCoordinates: ICoordinates,
  userCoordinates: ICoordinates,
): number => {
  const R = 6317e3;
  const p1 = (businessCoordinates.lat * Math.PI) / 180;
  const p2 = (userCoordinates.lat * Math.PI) / 180;
  const deltaLon = userCoordinates.lon - businessCoordinates.lon;
  const deltaLambda = (deltaLon * Math.PI) / 180;

  const distance =
    Math.acos(
      Math.sin(p1) * Math.sin(p2) +
        Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
    ) * R;

  return distance;
};

export const convertMoneyFloatToInt = (input: string): number => {
  const [integer, decimalPart] = input.replace(",", ".").split(".");

  if (decimalPart && decimalPart.length === 1) {
    return Number(integer + decimalPart + "0");
  }
  if (!decimalPart && integer) {
    return Number(integer + "00");
  }
  return Number(integer + decimalPart);
};

export const convertMoneyIntToFloat = (int: number): number => {
  const decimaledNumber =
    int.toString().slice(0, -2) + "." + int.toString().slice(-2);
  Number(decimaledNumber);
  return Number(decimaledNumber);
};

export const rawDistanceConvert = (distance: number): string => {
  const distanceString = distance.toString();
  const [fullValue] = distanceString.replace(",", ".").split(".");
  if (fullValue.length >= 4) {
    return `${(distance / 1000).toFixed(1)}km`;
  } else {
    return fullValue + "m";
  }
};

export const calculateFees = (props: ICalculateReceipt): ICalculateResult => {
  let deliveryMultiplier;

  for (const range of props.distanceRanges) {
    if (range.min >= props.distance && range.max <= props.distance) {
      deliveryMultiplier = range;
    }
  }
  if (!deliveryMultiplier) return { error: ErrorCodes.RECEIPT_ERROR };
  const surCharge = props.cartValue < props.minCartValue ? 200 : 0;
  const deliveryFee =
    (deliveryMultiplier.b * props.distance) / 2 + props.baseFee;

  const totalSum = props.cartValue + deliveryFee + surCharge;
  const totalFee: IReceipt = {
    cartValue: convertMoneyIntToFloat(props.cartValue),
    distance: rawDistanceConvert(props.distance),
    deliveryFee: convertMoneyIntToFloat(deliveryFee),
    surCharge: convertMoneyIntToFloat(surCharge),
    TotalPrice: convertMoneyIntToFloat(totalSum),
    Id: Math.random(),
  };
  return { result: totalFee };
};

export const setErrorMessage = (
  code: ErrorCodes,
  setError: React.Dispatch<React.SetStateAction<string>>,
) => {
  const state = store.getState();
  const errorStrings = strings[state.language.language].DETAILS.ERRORS;

  switch (code) {
    case ErrorCodes.COORDINATES_LAT:
      setError(errorStrings.COORDINATES.LATITUDE);
      break;
    case ErrorCodes.COORDINATES_LON:
      setError(errorStrings.COORDINATES.LONGITUDE);
      break;
    case ErrorCodes.INPUT_CART:
      setError(errorStrings.INPUT_CART);
      break;
    case ErrorCodes.VENUE_SLAG:
      setError(errorStrings.VENUE_SLAG);
      break;
    case ErrorCodes.RECEIPT_ERROR:
      setError(errorStrings.RECEIPT_ERROR);
      break;
    default:
      setError(errorStrings.NOT_FOUND);
      break;
  }
};
