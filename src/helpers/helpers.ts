import {
  coordinateEnum,
  ICalculateReceipt,
  ICoordinates,
  IReceipt,
} from "../types/DeliveryTypes";

export const validateMonetaryInput = (input: string): boolean => {
  /* digits + decimal seperator dot or comma and only two digits at the end */
  const regex = new RegExp("^\\d+([.|,]{1}(\\d{1,2})?)?$");
  return regex.test(input);
};

export const validateCoordinateInput = (
  input: string,
  coordinateDirection: coordinateEnum,
): boolean => {
  console.log(input);
  if (input === undefined) {
    return true;
  }
  // Regex checks allow + - at start with -90 to 90 or -180 to 180 with 7 decimal points and a dot seperator for it depending on param
  if (coordinateDirection === coordinateEnum.Latitude) {
    const regex = new RegExp(
      "^([-,+]?)(([0-8]?\\d|90)([.]{1}?(\\d{1,7})?)?)?$",
    );
    return regex.test(input);
  }
  if (coordinateDirection === coordinateEnum.Longitude) {
    const regex = new RegExp(
      "^([-,+]?)(([0-9]{1,2}|1[1-7][1-9]|180)([.]{1}?(\\d{1,7})?)?)?$",
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

export const calculateFees = (props: ICalculateReceipt): IReceipt => {
  let deliveryMultiplier;
  for (const range of props.distanceRanges) {
    if (range.min >= props.distance && range.max <= props.distance) {
      deliveryMultiplier = range;
    }
  }
  console.log(deliveryMultiplier);
};
