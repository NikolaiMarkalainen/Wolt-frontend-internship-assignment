import { configureStore } from "@reduxjs/toolkit";
import langaugeReducer from "./features/languageSlice";
import deliveryLocationReducer from "./features/deliveryLocationSlice";

export const store = configureStore({
  reducer: {
    language: langaugeReducer,
    delivery: deliveryLocationReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
