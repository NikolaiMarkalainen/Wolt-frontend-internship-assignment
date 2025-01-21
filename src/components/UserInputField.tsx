import "../App.css";
import {
  validateCoordinateInput,
  validateMonetaryInput,
} from "../helpers/helpers";
import { useLocalizedStrings } from "../hooks/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDeliveryLocation } from "../store/features/deliveryLocationSlice";
import {
  coordinateEnum,
  ICoordinates,
  IDeliveryLocation,
} from "../types/DeliveryTypes";
import { ErrorCodes } from "../types/ErrorTypes";

export const UserInputField = () => {
  const strings = useLocalizedStrings();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [longitude, setLongitude] = useState<string | number>();
  const [latitude, setLatitude] = useState<string | number>();
  const [venue, setVenue] = useState<string>("");
  const [cartValue, setCartValue] = useState<string>("");
  const [cartError, setCartError] = useState<string>("");
  const [latError, setLatError] = useState<string>("");
  const [lonError, setLonError] = useState<string>("");
  const dispatch = useDispatch();

  const getCoordinates = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      setIsLoading(false);
      clearFieldErrors(ErrorCodes.COORDINATES_LAT);
      clearFieldErrors(ErrorCodes.COORDINATES_LON);
    });
  };

  const calculateFees = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const staticApiResult = await fetch(
      `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue}/static`,
    ).then((response) => response.json());
    console.log(staticApiResult);
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
    const newCartValue = parseFloat(
      cartValue.replace(".", "").replace(",", "."),
    );
    const deliveryLocation: IDeliveryLocation = {
      coordinates,
      minCartValue,
      baseFee,
      distanceRanges,
      userCoordinates,
      cartValue: newCartValue,
    };
    dispatch(setDeliveryLocation(deliveryLocation));
  };

  const handleCartInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const validInput = validateMonetaryInput(input);
    setCartValue(input);
    if (validInput) {
      console.log("valid input");
      setCartError("");
    } else {
      console.log(input);
      setCartError(strings.DETAILS.ERRORS.INPUT_CART);
    }
  };

  const setFieldErrors = (code: ErrorCodes) => {
    switch (code) {
      case ErrorCodes.COORDINATES_LAT:
        setLatError(strings.DETAILS.ERRORS.COORDINATES.LATITUDE);
        break;
      case ErrorCodes.COORDINATES_LON:
        setLonError(strings.DETAILS.ERRORS.COORDINATES.LONGITUDE);
        break;
      case ErrorCodes.INPUT_CART:
        setCartError(strings.DETAILS.ERRORS.INPUT_CART);
        break;
    }
  };

  const clearFieldErrors = (code: ErrorCodes) => {
    switch (code) {
      case ErrorCodes.COORDINATES_LAT:
        setLatError("");
        break;
      case ErrorCodes.COORDINATES_LON:
        setLonError("");
        break;
      case ErrorCodes.INPUT_CART:
        setCartError("");
        break;
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
    setState: React.Dispatch<React.SetStateAction<number | string | undefined>>,
    coordinateDirection: coordinateEnum,
  ) => {
    const validInput = validateCoordinateInput(input, coordinateDirection);
    const errorCode = directionToErrorCode(coordinateDirection);
    if (validInput) {
      setState(input);
      clearFieldErrors(errorCode);
    } else {
      setFieldErrors(errorCode);
    }
  };
  return (
    <div className="input-field-parent">
      {isLoading && <div className="spinner"></div>}

      <div className="input-field-header">{strings.DETAILS.TITLE}</div>
      <div className="input-field-content">
        <form className="input-field-form" onSubmit={calculateFees}>
          <div data-test-id="venueSlug" className="input-field-child">
            <p> {strings.DETAILS.VENUE} </p>
            <input
              placeholder="home-assignment-venue-helsinki"
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
          <div data-test-id="cartValue" className="input-field-child">
            <p> {strings.DETAILS.CART} </p>
            <input type="text" value={cartValue} onChange={handleCartInput} />
          </div>
          {cartError && (
            <div className="input-field-child-error">{cartError}</div>
          )}

          <div data-test-id="userLatitude" className="input-field-child">
            <p> {strings.DETAILS.LATITUDE} </p>
            <input
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
          <div data-test-id="userLongitude" className="input-field-child">
            <p> {strings.DETAILS.LONGITUDE} </p>
            <input
              type="text"
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
          <div className="input-field-buttons">
            <button onClick={() => getCoordinates()} disabled={isLoading}>
              {isLoading ? "Loading..." : strings.DETAILS.BUTTON.LOCATION}{" "}
            </button>
            <button type="submit">{strings.DETAILS.BUTTON.CALCULATE}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
