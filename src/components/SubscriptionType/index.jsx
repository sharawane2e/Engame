import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../../components/widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import Toaster from "../../util/Toaster";
import { BASE_URL } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { Redirect, useHistory } from "react-router-dom";

const SubscriptionType = ({ data, toolId }) => {
  const [state] = useState(data);
  const history = useHistory();
  const [subscription, setSubscription] = useState("");
  const [type, setType] = useState("");
  const [base, setBase] = useState(0);
  const [valuePrice, setValuePrice] = useState(10);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const [itemId] = useSelector((state) => state.cart.cartItems);
  const intialValues = { email: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [isSubscription, setSubscriptionPopup] = useState(false);

  // get auth details from localstorage
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);

  const handleChange = (e) => {
    let plans = { user: res.token.user.pk, plan_type: e.target.value };
    setSubscription(e.target.value);
    setType(e.target.value);
    // setValuePrice("");
    if (e.target.value === 1) {
      setType("days");
    } else {
      setType("hits");
    }
    // setPrice(0);
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
    setSubscriptionPopup(false);
    fetch(BASE_URL + "cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${res.token.access_token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        history.push("/");
      });
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
      setPrice(valuePrice * base);
    } else {
      setType("hits");
      setBase(0.1);
      setPrice(valuePrice * base);
    }
  }, [handleChange, subscription, type, price, base]);

  const handleBlur = (e, key) => {
    // let value = e.target.value;
    // console.log(value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(name);
    // if (typeof value === "string") {
    //   value = value.trim();
    // }
    // const errorMessage = inputValidation.validateField(key, value).message;
    // this.setState({
    //   key: value,
    //   formErrors: { ...this.state.formErrors, [key]: errorMessage },
    // });
  };

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
              name="hits"
              className="subscription-type__inputbox"
              value={valuePrice}
              onBlur={(e) => handleBlur(e, "email")}
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
