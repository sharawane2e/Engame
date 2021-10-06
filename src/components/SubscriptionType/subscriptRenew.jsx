import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, BASE_URL_1, STRIPE } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { useHistory } from "react-router-dom";
import { getItemFromCart } from "../../redux/cart/action";
import { loadStripe } from "@stripe/stripe-js";
import { logOutUser } from "../../redux/user/user-action";
import Typography from "@material-ui/core/Typography";

const SubscriptionRenew = ({ updateData, onClose }) => {
  // console.log("cart value", updateData.plan.plan_value);
  const user = useSelector((state) => state.user.token);
  //const [subscription, setSubscription] = useState("");
  const [istype, setType] = useState(updateData.plan.plan_type);
  const [valuePrice, setValuePrice] = useState();
  const [RemainvaluePrice, setRemainvaluePrice] = useState(
    updateData.plan.plan_value
  );
  const [isCurentPrice, setCurentPrice] = useState(updateData.plan.price);
  const [isUpdateResult, setUpdateResult] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);

  localStorage.setItem("valuePrice", valuePrice);
  // console.log("valuePrice", valuePrice);

  const handleCalculatePrice = (e) => {
    let value = e.target.value;
    setValuePrice(value);
    istype === "days"
      ? setCurentPrice(value * 5)
      : setCurentPrice((value * 0.1).toFixed(2));

    if (e.target.value <= 0) {
      setCurentPrice(0);
    }

    if (e.target.value >= 2500000) {
      setCurentPrice("");
    }
  };

  useEffect(() => {
    dispatch(getItemFromCart());
  }, [isUpdateResult]);

  useEffect(() => {
    if (istype === "days") {
      setType("days");
      setCurentPrice(7 * 5);
      setValuePrice(7);
    } else {
      setType("hits");
      setCurentPrice((1000 * 0.1).toFixed(2));
      setValuePrice(1000);
    }
  }, [istype]);

  const ItemRenew = async () => {
    dispatch(loadingStart());
    const stripe = await loadStripe(STRIPE);
    try {
      await fetch(BASE_URL + "payments/checkout-session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          user: res.token.user.pk,
          is_renew: "true",
          plan_new_value: valuePrice,
          plan_type: istype,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.code == "token_not_valid") {
            dispatch(logOutUser());
            localStorage.removeItem("auth");
            dispatch(loadingStop());
            history.push("/");
          } else {
            //sessionStorage.setItem("sessionId", result.sessionId);
            stripe.redirectToCheckout({ sessionId: result.sessionId });
            localStorage.setItem("ExtendData", JSON.stringify(updateData));
            dispatch(loadingStop());
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="subscription-type">
        <select disabled>
          <option value={updateData.plan.plan_type} selected={istype == "days"}>
            {updateData.plan.plan_type == "days"
              ? "Number of days"
              : "Number of hits"}
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
              value={valuePrice <= 0 ? 0 : valuePrice}
              // onBlur={(e) => handleBlur(e, "email")}
              onChange={handleCalculatePrice}
            />
            <div className="subscription-type__text">{istype}</div>
          </div>
          <div className="subscription-type__amount  subscription-type__amount-text ">
            ${updateData.plan_type === "days" ? isCurentPrice : isCurentPrice}
          </div>
        </div>
      </div>
      <div className="popup-container__footer popup--text">
        <CustomButton
          className="primary-button add--card"
          onClick={ItemRenew}
          disabled={valuePrice == 0 || valuePrice == "" ? true : false}
        >
          <ShoppingCartIcon className="margin-right-15" />
          Extend Now
        </CustomButton>
      </div>
    </>
  );
};

export default SubscriptionRenew;
