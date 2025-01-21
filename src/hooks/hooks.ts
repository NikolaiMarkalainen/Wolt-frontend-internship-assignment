import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import strings from "../localization";
import { calculateFees, coordinateDistanceCalc } from "../helpers/helpers";
import { initialState } from "../store/features/deliveryLocationSlice";
import { ICalculateReceipt } from "../types/DeliveryTypes";

export const useLocalizedStrings = () => {
  const language = useSelector((s: RootState) => s.language.language);
  return strings[language] || strings.en;
};

export const useCalculatePrice = () => {
  const locationPrices = useSelector((s: RootState) => s.delivery);
  if (locationPrices === initialState) return;
  const distance = coordinateDistanceCalc(
    locationPrices.coordinates,
    locationPrices.userCoordinates,
  );
  // distance calculated now total price for distance and
  console.log(locationPrices);
  const feeVariables: ICalculateReceipt = {
    distance,
    minCartValue: locationPrices.minCartValue,
    baseFee: locationPrices.baseFee,
    distanceRanges: locationPrices.distanceRanges,
    cartValue: locationPrices.cartValue,
  };

  const fees = calculateFees(feeVariables);
  console.log(fees);
};
