export interface IDistanceRanges {
  min: number;
  max: number;
  a: number;
  b: number;
  flag?: string;
}

export interface IDeliveryLocation {
  coordinates: number[];
  minCartValue: number;
  baseFee: number;
  distanceRanges: IDistanceRanges[];
}
