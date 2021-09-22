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

const SubscriptionType = ({ updateData, toolId, onClose }) => {
  //const [state] = useState(data);
  // const history = useHistory();
  //console.log("cartCurentData", updateData);

  const [subscription, setSubscription] = useState("");
  const [type, setType] = useState("");
  const [base, setBase] = useState(0);
  const [valuePrice, setValuePrice] = useState(1000);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  //const [itemId] = useSelector((state) => state.cart.cartItems);

  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  console.log("updateData", updateData);

  //   const handleChange = (e) => {
  //     let plans = { user: res.token.user.pk, plan_type: e.target.value };

  //     setSubscription(e.target.value);
  //     setType(e.target.value);

  //     if (e.target.value === 1) {
  //       setType("days");
  //     } else {
  //       setType("hits");
  //     }

  //     if (e.target.value == "days") {
  //       setValuePrice(7);
  //     } else {
  //       setValuePrice(1000);
  //     }

  //     // setPrice(0);
  //     dispatch(loadingStart());
  //     fetch(BASE_URL + "cart/standard_price/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${res.token.access_token}`,
  //       },
  //       body: JSON.stringify(plans),
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setBase(result.base_price);
  //         dispatch(loadingStop());
  //       });
  //   };

  //   const user = {
  //     user: res.token.user.pk,
  //     widget: toolId,
  //     plan_type: type,
  //     plan_value: valuePrice,
  //     price: price,
  //     currency: "$",
  //   };

  //   const handleAddCart = async () => {
  //     dispatch(addToCart(user));
  //     // Toaster.sucess("You have item add successfully!", "topCenter");
  //     onClose();
  //   };

  //   const handleCalculatePrice = (e) => {
  //     let value = e.target.value * base;
  //     setPrice(value);
  //     setValuePrice(e.target.value);
  //     if (e.target.value <= 0) {
  //       setValuePrice(0);
  //     }
  //     if (e.target.value >= 2500000) {
  //       setValuePrice("");
  //     }
  //   };

  //   useEffect(() => {
  //     if (subscription === "days") {
  //       setType("days");
  //       setPrice(valuePrice * base);
  //       setValuePrice(valuePrice);
  //     } else {
  //       setType("hits");
  //       setBase(0.1);
  //       setPrice(valuePrice * base);
  //       setValuePrice(valuePrice);
  //     }
  //   }, [handleChange, subscription, type, price, base]);

  return (
    <>
      <div className="subscription-type">
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
              //   onChange={handleCalculatePrice}
            />
            <div className="subscription-type__text">
              {updateData.plan_type}
            </div>
          </div>
          <div className="subscription-type__amount  subscription-type__amount-text ">
            {/* ${updateData.price.toFixed(2)} */}${updateData.price}
          </div>
        </div>
      </div>
      <div className="popup-container__footer subscription-update">
        <CustomButton
          className="primary-button add--card"
          //   onClick={handleAddCart}
          //   disabled={valuePrice === 0 || valuePrice === "" ? true : false}
        >
          <ShoppingCartIcon /> Update to Cart
        </CustomButton>
      </div>
    </>
  );
};

export default SubscriptionType;
