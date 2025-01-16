import { useDispatch } from "react-redux";
import "../App.css";
import { useLocalizedStrings } from "../hooks/hooks";
import { Language } from "../types/LanguageTypes";
import { changeLanguage } from "../store/features/language/languageSlice";
export const Header = () => {
  const strings = useLocalizedStrings();
  const dispatch = useDispatch();

  const handleLanguageChange = (lang: Language) => {
    dispatch(changeLanguage(lang));
  };

  return (
    <div className="header">
      <h3>{strings.title}</h3>
      <div className="header-icons">
        <img
          src="/fin.png"
          onClick={() => handleLanguageChange(Language.Finnish)}
        />
        <img
          src="/uk.png"
          onClick={() => handleLanguageChange(Language.English)}
        />
      </div>
    </div>
  );
};
