export interface IDistanceRanges {
  min: number;
  max: number;
  a: number;
  b: number;
  flag?: string;
}

export interface IDeliveryLocation {
  coordinates: ICoordinates;
  minCartValue: number;
  baseFee: number;
  distanceRanges: IDistanceRanges[];
  userCoordinates: ICoordinates;
  cartValue: number;
}

export interface ICoordinates {
  lat: number;
  lon: number;
}

export interface IReceipt {
  cartValue: number;
  deliveryFee: number;
  distance: number;
  subCharge: number;
  TotalPrice: number;
}

export interface ICalculateReceipt {
  distance: number;
  distanceRanges: IDistanceRanges[];
  minCartValue: number;
  cartValue: number;
  baseFee: number;
}

export enum coordinateEnum {
  Latitude,
  Longitude,
}
