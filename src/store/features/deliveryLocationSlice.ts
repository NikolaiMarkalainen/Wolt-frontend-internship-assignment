import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeliveryLocation } from "../../types/DeliveryTypes";
import { RootState } from "../store";

export const initialState: IDeliveryLocation = {
  coordinates: {
    lat: 0,
    lon: 0,
  },
  minCartValue: 0,
  baseFee: 0,
  distanceRanges: [{ min: 0, max: 0, a: 0, b: 0 }],
  userCoordinates: {
    lat: 0,
    lon: 0,
  },
  cartValue: 0,
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveryLocation: (state, action: PayloadAction<IDeliveryLocation>) => {
      state.coordinates = action.payload.coordinates;
      state.minCartValue = action.payload.minCartValue;
      state.baseFee = action.payload.baseFee;
      state.distanceRanges = action.payload.distanceRanges;
      state.userCoordinates = action.payload.userCoordinates;
      state.cartValue = action.payload.cartValue;
    },
  },
});

export const { setDeliveryLocation } = deliverySlice.actions;

export const selectDelivery = (state: RootState) => state.delivery;

export default deliverySlice.reducer;
