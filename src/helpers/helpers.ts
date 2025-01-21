import { ICoordinates } from "../types/DeliveryLocationTypes";

export const validateMonetaryInput = (input: string): boolean => {
  /* digits + decimal seperator dot or comma and only two digits at the end */
  /*     ^\d+[.|,]{1}\d{2}$ */
  const regex = new RegExp("^\\d+[.|,]{1}\\d{2}$");
  return regex.test(input);
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
