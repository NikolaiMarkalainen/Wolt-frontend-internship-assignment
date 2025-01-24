import { useEffect, useState } from "react";
import "../App.css";
import {
  calculateFees,
  convertMoneyFloatToInt,
  setErrorMessage,
  variablesForCalculation,
} from "../utils/helpers/helpers";
import { useLocalizedStrings } from "../utils/hooks/hooks";

export const Receipt = () => {
  const strings = useLocalizedStrings();
  const rawVariables = variablesForCalculation();
  const [error, setError] = useState<string>("");
  let rawData;

  if (!rawVariables) {
    return <></>;
  }

  const receipt = calculateFees(rawVariables);

  useEffect(() => {
    if (receipt?.error) {
      setErrorMessage(receipt.error, setError);
    }
  }, [receipt?.error]);

  if (receipt?.result) {
    rawData = {
      cartValue: convertMoneyFloatToInt(receipt.result.cartValue.toString()),
      deliveryFee: convertMoneyFloatToInt(
        receipt.result.deliveryFee.toString(),
      ),
      totalValue: convertMoneyFloatToInt(receipt.result.TotalPrice.toString()),
      distance: rawVariables.distance.toFixed(0),
      surCharge: convertMoneyFloatToInt(receipt.result.surCharge.toString()),
    };
  }

  return (
    <div className="receipt-parent">
      <div className="receipt-header">{strings.RECEIPT.TITLE}</div>
      <div className="receipt-item">
        {strings.RECEIPT.CART}
        <p data-raw-value={rawData?.cartValue}>
          {receipt?.result?.cartValue} EUR
        </p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.DELIVERY.FEE}
        <p data-raw-value={rawData?.deliveryFee}>
          {receipt?.result?.deliveryFee} EUR
        </p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.DELIVERY.DISTANCE}
        <p data-raw-value={rawData?.distance}>{receipt?.result?.distance}</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.SMALL_CHARGE}
        <p data-raw-value={rawData?.surCharge}>
          {receipt?.result?.surCharge} EUR
        </p>
      </div>
      <div className="receipt-item-end">
        {strings.RECEIPT.TOTAL}
        <p data-raw-value={rawData?.totalValue}>
          {receipt?.result?.TotalPrice} EUR{" "}
        </p>
      </div>
      {receipt?.error && <div className="receipt-error">{error}</div>}
    </div>
  );
};
