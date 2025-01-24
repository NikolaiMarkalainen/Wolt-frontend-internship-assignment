import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import strings from "../localization";

export const useLocalizedStrings = () => {
  const language = useSelector((s: RootState) => s.language.language);
  return strings[language] || strings.en;
};
