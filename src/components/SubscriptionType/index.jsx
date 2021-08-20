import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../../components/widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/action";
import Toaster from "../../util/Toaster";

const SubscriptionType = ({ data, toolId }) => {
  const [state] = useState(data);
  const [subscription, setSubscription] = useState("");
  const [type, setType] = useState("");
  const [base, setBase] = useState(0);
  const [valuePrice, setValuePrice] = useState(0);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const [itemId] = useSelector((state) => state.cart.cartItems);
  const handleChange = (e) => {
    setSubscription(e.target.value);
    setValuePrice("");
    setPrice(0);
  };

  const handleCart = () => {
    dispatch(addToCart(toolId));
    Toaster.sucess("You have add successfully!", "topCenter");
  };

  const handleCalculatePrice = (e) => {
    let value = e.target.value * base;
    setPrice(value);
    setValuePrice(e.target.value);
  };
  // console.log(subscription);
  useEffect(() => {
    if (subscription == 1) {
      setBase(10);
      setType("Days");
    } else {
      setType("Hits");
      setBase(5);
    }
  }, [handleChange, subscription, type, price, base]);

  return (
    <>
      <div className="subscription-type">
        <select onChange={handleChange}>
          <option value="1">Number of days</option>
          <option value="2" selected>
            Number of hits
          </option>
        </select>

        <div className="subscription-type__iner">
          <div className="subscription-type__days">
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="subscription-type__inputbox"
              value={valuePrice}
              onChange={handleCalculatePrice}
            />
            <div className="subscription-type__text">{type}</div>
          </div>
          <div className="subscription-type__amount  subscription-type__amount-text ">
            ${price}
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
