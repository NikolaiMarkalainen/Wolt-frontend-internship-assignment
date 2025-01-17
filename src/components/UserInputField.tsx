import "../App.css";
import { validateMonetaryInput } from "../helpers/inputHelpers";
import { useLocalizedStrings } from "../hooks/hooks";
import { useState } from "react";
import { Receipt } from "./Receipt";
import { useDispatch } from "react-redux";
import { setDeliveryLocation } from "../store/features/deliveryLocationSlice";
import { IDeliveryLocation } from "../types/DeliveryLocationTypes";

export const UserInputField = () => {
  const strings = useLocalizedStrings();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [venue, setVenue] = useState<string>("");
  const [cartValue, setCartValue] = useState<string>("");
  const [cartError, setCartError] = useState<string>("");
  const dispatch = useDispatch();

  const getCoordinates = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      setIsLoading(false);
    });
  };

  const calculateFees = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const staticApiResult = await fetch(
      "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/static",
    ).then((response) => response.json());
    console.log(staticApiResult);
    const dynamicApiResult = await fetch(
      "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/dynamic",
    ).then((response) => response.json());

    const coordinates = staticApiResult.venue_raw.location.coordinates;
    const minCartValue =
      dynamicApiResult.venue_raw.delivery_specs.order_minimum_no_surcharge;
    const baseFee =
      dynamicApiResult.venue_raw.delivery_specs.delivery_pricing.base_price;
    const distanceRanges =
      dynamicApiResult.venue_raw.delivery_specs.delivery_pricing
        .distance_ranges;

    const deliveryLocation: IDeliveryLocation = {
      coordinates,
      minCartValue,
      baseFee,
      distanceRanges,
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

  return (
    <div className="card-parent">
      {isLoading && <div className="spinner"></div>}
      <div className="input-field-parent">
        <div className="input-field-header">{strings.DETAILS.TITLE}</div>
        <div className="input-field-content">
          <form onSubmit={calculateFees}>
            <div data-test-id="venueSlug" className="input-field-child">
              <p> {strings.DETAILS.VENUE} </p>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>
            <div data-test-id="cartValue" className="input-field-child">
              <p> {strings.DETAILS.CART} </p>
              <input type="text" value={cartValue} onChange={handleCartInput} />
              {cartError && <div style={{ color: "red" }}>{cartError}</div>}
            </div>
            <div data-test-id="userLatitude" className="input-field-child">
              <p> {strings.DETAILS.LATITUDE} </p>
              <input type="text" value={latitude} disabled />
            </div>
            <div data-test-id="userLongitude" className="input-field-child">
              <p> {strings.DETAILS.LONGITUDE} </p>
              <input type="text" value={longitude} disabled />
            </div>
            <div className="input-field-buttons">
              <button onClick={() => getCoordinates()} disabled={isLoading}>
                {isLoading ? "Loading..." : strings.DETAILS.BUTTON.LOCATION}{" "}
              </button>
              <button type="submit">{strings.DETAILS.BUTTON.CALCULATE}</button>
            </div>
          </form>
        </div>
      </div>
      <Receipt />
    </div>
  );
};
