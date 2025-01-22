import "../App.css";
import { useLocalizedStrings } from "../hooks/hooks";
import { IReceipt } from "../types/DeliveryTypes";

interface IProps {
  receipt: IReceipt;
}

export const Receipt = (props: IProps) => {
  const strings = useLocalizedStrings();
  return (
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
  );
};
