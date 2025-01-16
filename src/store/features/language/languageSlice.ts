import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Language } from "../../../types/LanguageTypes";

interface languageState {
  language: Language;
}

const initialState: languageState = {
  language: Language.English,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export const selectLanguage = (state: RootState) => state.language.language;

export default languageSlice.reducer;
