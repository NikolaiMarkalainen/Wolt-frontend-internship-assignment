import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import strings from "../localization";
import { coordinateDistanceCalc } from "../helpers/helpers";
import { initialState } from "../store/features/deliveryLocationSlice";

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

  console.log(distance);
};
