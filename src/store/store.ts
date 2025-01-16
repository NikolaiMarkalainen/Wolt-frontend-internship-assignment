import { configureStore } from "@reduxjs/toolkit";
import langaugeReducer from "./features/language/languageSlice";
export const store = configureStore({
  reducer: {
    language: langaugeReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
