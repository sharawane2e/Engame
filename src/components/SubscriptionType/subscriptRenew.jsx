import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, STRIPE } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { useHistory } from "react-router-dom";
import { getItemFromCart } from "../../redux/cart/action";
import { loadStripe } from "@stripe/stripe-js";
import { logOutUser } from "../../redux/user/user-action";
import Typography from "@material-ui/core/Typography";
import ApiRequest from "../../util/ApiRequest";
import { CHECKOUT } from "../../config/ApiUrl";
import Toaster from "../../util/Toaster";
import { ErrorMessages } from "../../constants/Messages";

const SubscriptionRenew = ({ updateData, onClose }) => {
  console.log("cart value", updateData);
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
    if (e.target.value <= 0) {
      var ItemCount = 1;
    } else if (e.target.value >= 999 && istype === "days") {
      var ItemCount = 999;
      Toaster.error(ErrorMessages.Maxium_days_addToCart, "topCenter");
    } else if (e.target.value >= 100000 && istype === "hits") {
      var ItemCount = 100000;
      Toaster.error(ErrorMessages.Maxium_hits_addToCart, "topCenter");
    } else {
      var ItemCount = e.target.value;
    }

    // let ItemCount = e.target.value;
    setValuePrice(ItemCount);
    istype === "days"
      ? setCurentPrice(ItemCount * 5)
      : setCurentPrice((ItemCount * 0.1).toFixed(2));

    // if (e.target.value <= 0) {
    //   setCurentPrice(0);
    // }

    // if (e.target.value >= 2500000) {
    //   setCurentPrice("");
    // }
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

    let CheckoutData = {
      user: res.token.user.pk,
      is_renew: "true",
      plan_new_value: valuePrice,
      plan_type: istype,
    };

    ApiRequest.request(CHECKOUT, "POST", CheckoutData)
      .then((res) => {
        stripe.redirectToCheckout({ sessionId: res.sessionId });
        localStorage.setItem("ExtendData", JSON.stringify(updateData));
        dispatch(loadingStop());
      })
      .catch((error) => {
        dispatch(logOutUser());
        localStorage.removeItem("auth");
        dispatch(loadingStop());
        history.push("/");
      });
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
