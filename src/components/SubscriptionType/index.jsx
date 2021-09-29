import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../../components/widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { addToCart } from "../../redux/cart/action";
import ApiRequest from "../../util/ApiRequest";
import { CART_STANDARD_PRICE } from "../../config/ApiUrl";

const SubscriptionType = ({ toolId, onClose }) => {
  const [subscription, setSubscription] = useState("");
  const [type, setType] = useState("");
  const [base, setBase] = useState(0);
  const [valuePrice, setValuePrice] = useState(1000);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();

  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);

  const handleChange = (e) => {
    let plans = { user: res.token.user.pk, plan_type: e.target.value };

    setSubscription(e.target.value);
    setType(e.target.value);

    if (e.target.value === 1) {
      setType("days");
    } else {
      setType("hits");
    }

    if (e.target.value == "days") {
      setValuePrice(7);
    } else {
      setValuePrice(1000);
    }

    dispatch(loadingStart());
    ApiRequest.request(CART_STANDARD_PRICE, "POST", plans)
      .then((result) => {
        setBase(result.base_price);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(loadingStop());
      });

    // fetch(BASE_URL + "cart/standard_price/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${res.token.access_token}`,
    //   },
    //   body: JSON.stringify(plans),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setBase(result.base_price);
    //     // console.log("result.base_price", result.base_price);
    //     dispatch(loadingStop());
    //   });
  };

  const user = {
    user: res.token.user.pk,
    widget: toolId,
    plan_type: type,
    plan_value: valuePrice,
    price: price,
    currency: "$",
  };

  const handleAddCart = async () => {
    dispatch(addToCart(user));
    // Toaster.sucess("You have item add successfully!", "topCenter");
    onClose();
  };

  const handleCalculatePrice = (e) => {
    let value = e.target.value * base;
    setPrice(value);
    setValuePrice(e.target.value);
    if (e.target.value <= 0) {
      setValuePrice(0);
    }
    if (e.target.value >= 2500000) {
      setValuePrice("");
    }
  };

  useEffect(() => {
    if (subscription === "days") {
      setType("days");
      setPrice(valuePrice * base);
      setValuePrice(valuePrice);
    } else {
      setType("hits");
      setBase(0.1);
      setPrice(valuePrice * base);
      setValuePrice(valuePrice);
    }
  }, [handleChange, subscription, type, price, base]);

  return (
    <>
      <div className="subscription-type">
        <select onChange={handleChange} defaultValue="hits">
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
              // onBlur={(e) => handleBlur(e, "email")}
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
          onClick={handleAddCart}
          disabled={valuePrice === 0 || valuePrice === "" ? true : false}
        >
          <ShoppingCartIcon /> Add to Cart
        </CustomButton>
      </div>
    </>
  );
};

export default SubscriptionType;
