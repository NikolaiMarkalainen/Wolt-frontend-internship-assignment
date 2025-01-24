import { useDispatch } from "react-redux";
import "../App.css";
import { Language } from "../types/LanguageTypes";
import { changeLanguage } from "../store/features/languageSlice";
import { useLocalizedStrings } from "../utils/hooks/hooks";
export const Header = () => {
  const dispatch = useDispatch();

  const handleLanguageChange = (lang: Language) => {
    dispatch(changeLanguage(lang));
  };
  const strings = useLocalizedStrings();
  return (
    <div className="header">
      <h3>{strings.TITLE}</h3>
      <div className="header-icons">
        <img
          id="finlang"
          src="/fin.png"
          onClick={() => handleLanguageChange(Language.Finnish)}
        />
        <img
          id="englang"
          src="/uk.png"
          onClick={() => handleLanguageChange(Language.English)}
        />
      </div>
    </div>
  );
};
