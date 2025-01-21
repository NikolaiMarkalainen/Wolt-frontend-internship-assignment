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

export interface IUserOrderData {
  lat: number;
  lon: number;
  cartValue: string;
}

export interface ICoordinates {
  lat: number;
  lon: number;
}
