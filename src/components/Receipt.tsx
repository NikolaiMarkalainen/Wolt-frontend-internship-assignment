import "../App.css";
import { useCalculatePrice, useLocalizedStrings } from "../hooks/hooks";

export const Receipt = () => {
  const strings = useLocalizedStrings();
  useCalculatePrice();
  return (
    <div className="receipt-parent">
      <div className="receipt-header">{strings.RECEIPT.TITLE}</div>
      <div className="receipt-item">
        {strings.RECEIPT.CART}
        <p>10.90$</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.DELIVERY.FEE}
        <p>5$</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.DELIVERY.DISTANCE}
        <p>177m</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.SMALL_CHARGE}
        <p>2.30$</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.TOTAL}
        <p>100$</p>
      </div>
    </div>
  );
};
