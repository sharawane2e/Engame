import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../../components/widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import Toaster from "../../util/Toaster";
import { BASE_URL } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";

const SubscriptionType = ({ data, toolId }) => {
  const [state] = useState(data);
  const [subscription, setSubscription] = useState("");
  const [type, setType] = useState("");
  const [base, setBase] = useState(0);
  const [valuePrice, setValuePrice] = useState("");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const [itemId] = useSelector((state) => state.cart.cartItems);

  // get auth details from localstorage
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  console.log(base);

  const handleChange = (e) => {
    let plans = { user: res.token.user.pk, plan_type: e.target.value };
    setSubscription(e.target.value);
    setType(e.target.value);
    setValuePrice("");
    if (e.target.value === 1) {
      setType("days");
    } else {
      setType("hits");
    }
    setPrice(0);
    dispatch(loadingStart());
    fetch(BASE_URL + "cart/standard_price/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${res.token.access_token}`,
      },
      body: JSON.stringify(plans),
    })
      .then((response) => response.json())
      .then((result) => {
        setBase(result.base_price);
        dispatch(loadingStop());
      });
  };

  const user = {
    user: res.token.user.pk,
    widget: toolId,
    plan_type: type,
    plan_value: valuePrice,
    price: price,
    currency: "$",
  };

  const handleCart = () => {
    // dispatch(addToCart(toolId));
    Toaster.sucess("You have add successfully!", "topCenter");
    fetch(BASE_URL + "cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${res.token.access_token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  const handleCalculatePrice = (e) => {
    let value = e.target.value * base;
    setPrice(value);
    setValuePrice(e.target.value);
  };
  // console.log(subscription);
  useEffect(() => {
    if (subscription == "days") {
      setType("days");
    } else {
      setType("hits");
      setBase(0.1);
    }
  }, [handleChange, subscription, type, price, base]);

  return (
    <>
      <div className="subscription-type">
        <select onChange={handleChange}>
          <option value="days">Number of days</option>
          <option value="hits" selected>
            Number of hits
          </option>
        </select>

        <div className="subscription-type__iner">
          <div className="subscription-type__days">
            <TextField
              type="number"
              id="outlined-basic"
              variant="outlined"
              className="subscription-type__inputbox"
              value={valuePrice}
              onChange={handleCalculatePrice}
            />
            <div className="subscription-type__text">{type}</div>
          </div>
          <div className="subscription-type__amount  subscription-type__amount-text ">
            ${price.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="popup-container__footer">
        <CustomButton
          className="primary-button add--card"
          onClick={handleCart}
          disabled={valuePrice == 0 || valuePrice == "" ? true : false}
        >
          <ShoppingCartIcon /> Add to Cart
        </CustomButton>
      </div>
    </>
  );
};

export default SubscriptionType;
