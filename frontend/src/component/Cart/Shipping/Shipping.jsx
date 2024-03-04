import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveTheShippingInfo } from "../../../actions/cartActions";
import MetaData from "../../layout/Helmets/MetaData"
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNumber, setPhoneNo] = useState(shippingInfo.phoneNumber);

  const shippingSubmit = (event) => {
    event.preventDefault();

    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveTheShippingInfo({ address, city, state, country, pinCode, phoneNumber })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />


      <div className="shippingContainer">
        <div className="shippingBox">
        <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(event) => setPinCode(event.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(event) => setPhoneNo(event.target.value)}
                size="10"
              />
            </div>

            <div>
              <select
                required
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <select
                  required
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;