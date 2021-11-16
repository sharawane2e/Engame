import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../../components/widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch } from "react-redux";
//import Toaster from "../../util/Toaster";
import { BASE_URL } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
//import { useHistory } from "react-router-dom";
// import { addToCart } from "../../redux/cart/action";
import { getItemFromCart } from "../../redux/cart/action";
import ApiRequest from "../../util/ApiRequest";
import { CART_DETAILS } from "../../config/ApiUrl";
import Toaster from "../../util/Toaster";
import { ErrorMessages } from "../../constants/Messages";

const SubscriptionUpdate = ({ updateData, onClose }) => {
  const [istype, setType] = useState(updateData.plan_type);
  const [valuePrice, setValuePrice] = useState(updateData.plan_value);
  const [isCurentPrice, setCurentPrice] = useState(updateData.price);
  const [isUpdateResult, setUpdateResult] = useState("");
  const dispatch = useDispatch();

  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);

  const handleChange = (e) => {
    if (e.target.value === "days") {
      setType("days");

      updateData.plan_type === "days"
        ? setValuePrice(updateData.plan_value)
        : setValuePrice(7);
      updateData.plan_type === "days"
        ? setCurentPrice(updateData.plan_value * 5)
        : setCurentPrice(7 * 5);
    } else {
      setType("hits");
      updateData.plan_type === "hits"
        ? setValuePrice(updateData.plan_value)
        : setValuePrice(1000);
      updateData.plan_type === "hits"
        ? setCurentPrice(updateData.plan_value * 0.1)
        : setCurentPrice(1000 * 0.1);
    }
  };

  const handleCalculatePrice = (e) => {
    let value = e.target.value > 0 ? e.target.value : 1;

    if (e.target.value <= 0) {
      var ItemCount = 1;
    } else if (e.target.value > 999 && istype === "days") {
      var ItemCount = 999;
      Toaster.error(ErrorMessages.Maxium_days_addToCart, "topCenter");
    } else if (e.target.value > 100000 && istype === "hits") {
      var ItemCount = 100000;
      Toaster.error(ErrorMessages.Maxium_hits_addToCart, "topCenter");
    } else {
      var ItemCount = e.target.value;
    }

    setValuePrice(ItemCount);
    istype === "days"
      ? setCurentPrice(ItemCount * 5)
      : setCurentPrice((ItemCount * 0.1).toFixed(2));
  };

  useEffect(async () => {
    await dispatch(getItemFromCart());
    await dispatch(loadingStop());
  }, [isUpdateResult]);

  const cartItemUpdate = async () => {
    let ItemPlans = {
      user: res.token.user.pk,
      widget: updateData.widget.id,
      plan_type: istype,
      plan_value: valuePrice,
      currency: updateData.currency,
      is_renew: "false",
    };
    await dispatch(loadingStart());

    await ApiRequest.request(
      CART_DETAILS + `${updateData.id}/`,
      "PUT",
      ItemPlans
    ).then((res) => {
      setUpdateResult(res);
      onClose();
    });
  };

  return (
    <>
      <div className="subscription-type">
        <select onChange={handleChange}>
          <option value="days" selected={istype == "days"}>
            Number of days
          </option>
          <option value="hits" selected={istype == "hits"}>
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
              value={valuePrice > 0 ? valuePrice : 1}
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
          onClick={cartItemUpdate}
          disabled={valuePrice == 0 || valuePrice == "" ? true : false}
        >
          <ShoppingCartIcon className="margin-right-15" /> Update Cart
        </CustomButton>
      </div>
    </>
  );
};

export default SubscriptionUpdate;
