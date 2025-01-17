import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IDeliveryLocation,
  IDistanceRanges,
} from "../../types/DeliveryLocationTypes";
import { RootState } from "../store";

interface deliveryLocationState {
  coordinates: number[];
  minCartValue: number;
  baseFee: number;
  distanceRanges: IDistanceRanges[];
}

const initialState: deliveryLocationState = {
  coordinates: [0.0, 0.0],
  minCartValue: 0,
  baseFee: 0,
  distanceRanges: [{ min: 0, max: 0, a: 0, b: 0 }],
};

export const deliveryLocationSlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveryLocation: (state, action: PayloadAction<IDeliveryLocation>) => {
      state.coordinates = action.payload.coordinates;
      state.minCartValue = action.payload.minCartValue;
      state.baseFee = action.payload.baseFee;
      state.distanceRanges = action.payload.distanceRanges;
    },
  },
});

export const { setDeliveryLocation } = deliveryLocationSlice.actions;

export const selectDelivery = (state: RootState) => state.delivery;

export default deliveryLocationSlice.reducer;
