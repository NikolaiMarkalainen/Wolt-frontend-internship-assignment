import { useEffect, useState } from "react";
import "../App.css";
import { setErrorMessage } from "../helpers/helpers";
import { useCalculatePrice, useLocalizedStrings } from "../hooks/hooks";

export const Receipt = () => {
  const strings = useLocalizedStrings();
  const receipt = useCalculatePrice();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (receipt?.error) {
      setErrorMessage(receipt.error, setError);
    }
  }, [receipt?.error]);

  return (
    <div className="receipt-parent">
      <div className="receipt-header">{strings.RECEIPT.TITLE}</div>
      <div className="receipt-item">
        {strings.RECEIPT.CART}
        <p>{receipt?.result?.cartValue} EUR</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.DELIVERY.FEE}
        <p>{receipt?.result?.deliveryFee} EUR</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.DELIVERY.DISTANCE}
        <p>{receipt?.result?.distance}</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.SMALL_CHARGE}
        <p>{receipt?.result?.surCharge} EUR</p>
      </div>
      <div className="receipt-item-end">
        {strings.RECEIPT.TOTAL}
        <p>{receipt?.result?.TotalPrice} EUR </p>
      </div>
      {receipt?.error && <div className="receipt-error">{error}</div>}
    </div>
  );
};

/*
    <div className="receipt-parent">
      <div className="receipt-header">{strings.RECEIPT.TITLE}</div>
      <div className="receipt-item">
        {strings.RECEIPT.CART}
        <p>{props.receipt.cartValue} EUR</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.DELIVERY.FEE}
        <p>{props.receipt.deliveryFee} EUR</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.DELIVERY.DISTANCE}
        <p>{props.receipt.distance}</p>
      </div>
      <div className="receipt-item">
        {strings.RECEIPT.SMALL_CHARGE}
        <p>{props.receipt.surCharge} EUR</p>
      </div>
      <div className="receipt-item-end">
        {strings.RECEIPT.TOTAL}
        <p>{props.receipt.TotalPrice} EUR </p>
      </div>
    </div>

    */
