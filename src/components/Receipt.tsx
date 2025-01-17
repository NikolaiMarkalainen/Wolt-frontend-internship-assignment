import "../App.css";
import { useLocalizedStrings } from "../hooks/hooks";

export const Receipt = () => {
  const strings = useLocalizedStrings();
  return <div className="receipt-parent">{strings.RECEIPT.TITLE}</div>;
};
