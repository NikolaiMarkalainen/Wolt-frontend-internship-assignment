export const validateMonetaryInput = (input: string): boolean => {
  /* digits + decimal seperator dot or comma and only two digits at the end */
  /*     ^\d+[.|,]{1}\d{2}$ */
  const regex = new RegExp("^\\d+[.|,]{1}\\d{2}$");
  return regex.test(input);
};

// Law of Haversines, birds flight
export const coordinateDistanceCalc = (
  coordinatesA: number[],
  coordinatesB: number[],
): number => {
  const R = 6317e3;
  const p1 = (coordinatesA[1] * Math.PI) / 180;
  const p2 = (coordinatesB[1] * Math.PI) / 180;
  const deltaLon = coordinatesB[0] - coordinatesA[0];
  const deltalambda = (deltaLon * Math.PI) / 180;

  const innerValue =
    Math.sin(p1) * Math.sin(p2) +
    Math.cos(p1) * Math.cos(p2) * Math.cos(deltalambda);

  const clampedValue = Math.max(-1, Math.min(1, innerValue));

  const d = Math.acos(clampedValue) * R;

  console.log(d);
  return d;
};
