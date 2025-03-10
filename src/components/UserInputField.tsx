import "../App.css";
import {
  convertMoneyFloatToInt,
  setErrorMessage,
  validateCoordinateInput,
  validateMonetaryInput,
} from "../utils/helpers/helpers";
import { useLocalizedStrings } from "../utils/hooks/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDeliveryLocation } from "../store/features/deliveryLocationSlice";
import {
  coordinateEnum,
  ICoordinates,
  IDeliveryLocation,
} from "../types/DeliveryTypes";
import { ErrorCodes } from "../types/ErrorTypes";
import { Receipt } from "./Receipt";
export const UserInputField = () => {
  const strings = useLocalizedStrings();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [longitude, setLongitude] = useState<string | number>("");
  const [latitude, setLatitude] = useState<string | number>("");
  const [venue, setVenue] = useState<string>("");
  const [cartValue, setCartValue] = useState<string>("");
  const [cartError, setCartError] = useState<string>("");
  const [latError, setLatError] = useState<string>("");
  const [lonError, setLonError] = useState<string>("");
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const [renderReceipt, setRenderReceipt] = useState<boolean>(false);
  const [loadingReceipt, setIsLoadingReceipt] = useState<boolean | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    const allFieldsFilled = longitude && latitude && cartValue && venue;
    setDisableSubmit(!allFieldsFilled);
  }, [longitude, latitude, cartValue, venue]);

  useEffect(() => {
    console.log(loadingReceipt);
    if (!loadingReceipt && loadingReceipt !== undefined) setRenderReceipt(true);
  }, [loadingReceipt]);
  const getCoordinates = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      setIsLoading(false);
      setLatError("");
      setLonError("");
    });
  };
  const validateFormEntries = (): boolean => {
    if (!latitude) {
      setErrorMessage(ErrorCodes.COORDINATES_LAT, setLatError);
      return false;
    }
    if (!longitude) {
      setErrorMessage(ErrorCodes.COORDINATES_LON, setLonError);
      return false;
    }
    if (!cartValue) {
      setErrorMessage(ErrorCodes.INPUT_CART, setCartError);
      return false;
    }
    return true;
  };

  const calculateFees = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validForm = validateFormEntries();
    if (!validForm) return;
    setIsLoadingReceipt(true);
    try {
      const staticApiResult = await fetch(
        `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue}/static`,
      ).then((response) => response.json());
      const dynamicApiResult = await fetch(
        `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue}/dynamic`,
      ).then((response) => response.json());

      const [lon, lat] = staticApiResult.venue_raw.location.coordinates;
      const coordinates = { lat, lon };
      const minCartValue =
        dynamicApiResult.venue_raw.delivery_specs.order_minimum_no_surcharge;
      const baseFee =
        dynamicApiResult.venue_raw.delivery_specs.delivery_pricing.base_price;
      const distanceRanges =
        dynamicApiResult.venue_raw.delivery_specs.delivery_pricing
          .distance_ranges;
      const userCoordinates: ICoordinates = {
        lat: Number(latitude),
        lon: Number(longitude),
      };
      const fixedCartValue = convertMoneyFloatToInt(cartValue);
      const deliveryLocation: IDeliveryLocation = {
        coordinates,
        minCartValue,
        baseFee,
        distanceRanges,
        userCoordinates,
        cartValue: fixedCartValue,
      };
      dispatch(setDeliveryLocation(deliveryLocation));
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoadingReceipt(false);
    }
  };

  const handleCartInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const validInput = validateMonetaryInput(input);
    if (validInput) {
      setCartValue(input);
      setCartError("");
    } else {
      setErrorMessage(ErrorCodes.INPUT_CART, setCartError);
    }
  };

  const directionToErrorCode = (direction: coordinateEnum): ErrorCodes => {
    if (direction === coordinateEnum.Latitude)
      return ErrorCodes.COORDINATES_LAT;
    if (direction === coordinateEnum.Longitude)
      return ErrorCodes.COORDINATES_LON;
    else return ErrorCodes.NOT_FOUND;
  };

  const handleCoordinateManualInput = (
    input: string,
    setState: React.Dispatch<React.SetStateAction<number | string>>,
    coordinateDirection: coordinateEnum,
  ) => {
    const validInput = validateCoordinateInput(input, coordinateDirection);
    const errorCode = directionToErrorCode(coordinateDirection);
    const isLat = coordinateDirection === coordinateEnum.Latitude;

    if (validInput) {
      setState(input);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isLat ? setLatError("") : setLonError("");
    } else {
      setErrorMessage(errorCode, isLat ? setLatError : setLonError);
    }
  };

  return (
    <div className="card-parent">
      <div className="input-field-parent">
        <div className="input-field-header-bar"></div>
        <div className="input-field-header">{strings.DETAILS.TITLE}</div>
        <div className="input-field-content">
          <form className="input-field-form" onSubmit={calculateFees}>
            <div className="input-field-child">
              <p> {strings.DETAILS.VENUE} </p>
              <input
                data-test-id="venueSlug"
                placeholder="home-assignment-venue-helsinki"
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>
            <div className="input-field-child">
              <p> {strings.DETAILS.CART} </p>
              <input
                data-test-id="cartValue"
                type="text"
                value={cartValue}
                onChange={handleCartInput}
              />
            </div>
            {cartError && (
              <div className="input-field-child-error">{cartError}</div>
            )}

            <div className="input-field-child">
              <p> {strings.DETAILS.LATITUDE} </p>
              <input
                data-test-id="userLatitude"
                type="text"
                value={latitude}
                onChange={(e) =>
                  handleCoordinateManualInput(
                    e.target.value,
                    setLatitude,
                    coordinateEnum.Latitude,
                  )
                }
              />
            </div>
            {latError && (
              <div className="input-field-child-error">{latError}</div>
            )}
            <div className="input-field-child">
              <p> {strings.DETAILS.LONGITUDE} </p>
              <input
                type="text"
                data-test-id="userLongitude"
                value={longitude}
                onChange={(e) =>
                  handleCoordinateManualInput(
                    e.target.value,
                    setLongitude,
                    coordinateEnum.Longitude,
                  )
                }
              />
            </div>
            {lonError && (
              <div className="input-field-child-error">{lonError}</div>
            )}
            {isLoading && <div className="spinner"></div>}

            <div className="input-field-buttons">
              <button onClick={() => getCoordinates()} disabled={isLoading}>
                {isLoading ? "Loading..." : strings.DETAILS.BUTTON.LOCATION}{" "}
              </button>
              <button disabled={disableSubmit} type="submit">
                {strings.DETAILS.BUTTON.CALCULATE}
              </button>
            </div>
          </form>
        </div>
      </div>
      {renderReceipt && <Receipt />}
    </div>
  );
};
