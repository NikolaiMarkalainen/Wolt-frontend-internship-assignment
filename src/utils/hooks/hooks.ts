import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import strings from "../localization";
import {
  calculateFees,
  coordinateDistanceCalc,
} from "../../utils/helpers/helpers";
import { initialState } from "../../store/features/deliveryLocationSlice";
import { ICalculateReceipt, ICalculateResult } from "../../types/DeliveryTypes";
import { ErrorCodes } from "../../types/ErrorTypes";

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
  const fees = calculateFees(feeVariables);
  return fees;
};

export const useErrorMessageSet = (
  code: ErrorCodes,
  setError: React.Dispatch<React.SetStateAction<string>>,
) => {
  const strings = useLocalizedStrings();

  switch (code) {
    case ErrorCodes.COORDINATES_LAT:
      setError(strings.DETAILS.ERRORS.COORDINATES.LATITUDE);
      break;
    case ErrorCodes.COORDINATES_LON:
      setError(strings.DETAILS.ERRORS.COORDINATES.LONGITUDE);
      break;
    case ErrorCodes.INPUT_CART:
      setError(strings.DETAILS.ERRORS.INPUT_CART);
      break;
    case ErrorCodes.VENUE_SLAG:
      setError(strings.DETAILS.ERRORS.VENUE_SLAG);
      break;
    case ErrorCodes.RECEIPT_ERROR:
      setError(strings.DETAILS.ERRORS.RECEIPT_ERROR);
      break;
    default:
      setError(strings.DETAILS.ERRORS.NOT_FOUND);
      break;
  }
};
