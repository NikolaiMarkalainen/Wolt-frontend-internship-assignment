import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import strings from "../localization";
import {
  calculateFees,
  coordinateDistanceCalc,
} from "../../utils/helpers/helpers";
import { initialState } from "../../store/features/deliveryLocationSlice";
import { ICalculateReceipt, ICalculateResult } from "../../types/DeliveryTypes";

export const useLocalizedStrings = () => {
  const language = useSelector((s: RootState) => s.language.language);
  return strings[language] || strings.en;
};

export const useCalculatePrice = (): ICalculateResult | undefined => {
  const locationPrices = useSelector((s: RootState) => s.delivery);
  if (locationPrices === initialState) return;
  const distance = coordinateDistanceCalc(
    locationPrices.coordinates,
    locationPrices.userCoordinates,
  );
  // distance calculated now total price for distance and
  const feeVariables: ICalculateReceipt = {
    distance,
    minCartValue: locationPrices.minCartValue,
    baseFee: locationPrices.baseFee,
    distanceRanges: locationPrices.distanceRanges,
    cartValue: locationPrices.cartValue,
  };
  console.log(locationPrices.coordinates, feeVariables);
  const fees = calculateFees(feeVariables);
  return fees;
};
