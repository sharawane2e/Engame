import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../../components/widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch } from "react-redux";
//import Toaster from "../../util/Toaster";
import { BASE_URL } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
//import { useHistory } from "react-router-dom";
import { addToCart } from "../../redux/cart/action";

const SubscriptionUpdate = ({ updateData, onClose }) => {

  console.log(updateData)
  //const [subscription, setSubscription] = useState("");
  const [istype, setType] = useState(updateData.plan_type);
  const [valuePrice, setValuePrice] = useState(updateData.plan_value);
  const [isCurentPrice, setCurentPrice] = useState(updateData.price);
  const dispatch = useDispatch();

  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
 

  const handleChange = (e) => {
    if (e.target.value === "days" ) {
      setType("days");
      updateData.plan_type === "days" ? setValuePrice(updateData.plan_value):setValuePrice(7);
      updateData.plan_type === "days" ? setCurentPrice(updateData.plan_value * 5) : setCurentPrice(7 * 5)
    } else {
      setType("hits");
      updateData.plan_type === "hits" ? setValuePrice(updateData.plan_value) :setValuePrice(1000);
      updateData.plan_type === "hits" ? setCurentPrice(updateData.plan_value * 0.1) : setCurentPrice(1000 * 0.1)
    }
  };

  const handleCalculatePrice = (e) => {
    let value = e.target.value;
    setValuePrice(value);
    istype === "days" ? setCurentPrice(value * 5) : setCurentPrice((value * 0.1).toFixed(2));
    if (e.target.value <= 0) {
      setCurentPrice(0);
    }
    if (e.target.value >= 2500000) {
      setCurentPrice("");
    }
  };

  const cartUpdate =  () => {
    console.log(istype,valuePrice,isCurentPrice)
   // dispatch(addToCart(user));
    // Toaster.sucess("You have item add successfully!", "topCenter");
   // onClose();
    //console.log("data user",widgetid)
   let plans = { user: res.token.user.pk ,widget:updateData.widget.id, plan_type: istype,plan_value:valuePrice,price:isCurentPrice,currency:updateData.currency };
  //  console.log("plans",plans)

    dispatch(loadingStart());
    fetch(BASE_URL + "cart/detail/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${res.token.access_token}`,
      },
      body: JSON.stringify(plans),
    })
      .then((response) => response.json())
      .then((result) => {
       console.log(result);
        dispatch(loadingStop());
      });
  };


  return (
    <>
      <div className="subscription-type">
        <select onChange={handleChange} >
          <option value="days" selected={istype == "days"}>Number of days</option>
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
              value={valuePrice}
              // onBlur={(e) => handleBlur(e, "email")}
              onChange={handleCalculatePrice}
            />
            <div className="subscription-type__text">{istype}</div>
          </div>
          <div className="subscription-type__amount  subscription-type__amount-text ">
            ${updateData.plan_type === "days"? isCurentPrice: isCurentPrice}
          </div>
        </div>
      </div>
      <div className="popup-container__footer">
        <CustomButton
          className="primary-button add--card"
          onClick={cartUpdate}
          disabled={valuePrice === 0 || valuePrice === "" ? true : false}
        >
          <ShoppingCartIcon /> Update Cart
        </CustomButton>
      </div>
    </>
  );
};

export default SubscriptionUpdate;
