import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { STRIPE } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { getItemFromCart } from "../../redux/cart/action";
import { loadStripe } from "@stripe/stripe-js";
import ApiRequest from "../../util/ApiRequest";
import { CHECKOUT } from "../../config/ApiUrl";
import Toaster from "../../util/Toaster";
import { ErrorMessages } from "../../constants/Messages";
import LocalStorageUtils from "../../util/LocalStorageUtils";
import LocalStorageType from "../../config/LocalStorageType";

const SubscriptionRenew = ({ updateData }) => {
  const [istype, setType] = useState(updateData.plan.plan_type);
  const [valuePrice, setValuePrice] = useState();
  const [isCurentPrice, setCurentPrice] = useState(updateData.plan.price);
  const [isCountLimit, setIsCountLimit] = useState("");
  const dispatch = useDispatch();

  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);

  LocalStorageUtils.setLocalStorage(
    LocalStorageType.SET,
    "valuePrice",
    valuePrice
  );

  const handleCalculatePrice = (e) => {
    if (e.target.value <= 0) {
      var ItemCount = 1;
      setIsCountLimit(ErrorMessages.MINIMUM_COUNT);
    } else if (e.target.value >= 999 && istype === "days") {
      var ItemCount = 999;
      setIsCountLimit(ErrorMessages.Maxium_days_addToCart);
    } else if (e.target.value >= 100000 && istype === "hits") {
      var ItemCount = 100000;
      setIsCountLimit(ErrorMessages.Maxium_hits_addToCart);
    } else {
      var ItemCount = e.target.value;
      setIsCountLimit("");
    }

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
    dispatch(loadingStop());
    dispatch(getItemFromCart());
  }, []);

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

    ApiRequest.request(CHECKOUT, "POST", CheckoutData).then((res) => {
      if (res.status) {
        stripe.redirectToCheckout({ sessionId: res.data[0].sessionId });
        LocalStorageUtils.setLocalStorage(
          LocalStorageType.SET,
          "ExtendData",
          JSON.stringify(updateData)
        );
      } else {
        Toaster.error(res?.detail?.message, "topCenter");
      }
      // dispatch(loadingStop());
    });
  };

  return (
    <>
      <div className="subscription-type">
        <div className="select-box select-box-disable">
          <select disabled className="subscription-type__subscriptionRenew">
            <option
              value={updateData.plan.plan_type}
              selected={istype == "days"}
            >
              {updateData.plan.plan_type == "days"
                ? "Number of days"
                : "Number of hits"}
            </option>
          </select>
        </div>

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
        <div className="validated-error">
          {isCountLimit}
          {isCountLimit && valuePrice > 1 ? (
            <span>
              <a href="mailto:support-engame@e2eresearch.com"> email us </a> for
              help
            </span>
          ) : (
            ""
          )}
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
