import React, { useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../../components/widgets/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch,useSelector } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { addToCart } from "../../redux/cart/action";
import ApiRequest from "../../util/ApiRequest";
import { CART_STANDARD_PRICE } from "../../config/ApiUrl";
// import Toaster from "../../util/Toaster";
import { ErrorMessages } from "../../constants/Messages";

const SubscriptionType = ({ toolId, toolName, onClose }) => {
  const [subscription, setSubscription] = useState("");
  const [type, setType] = useState("");
  const [base, setBase] = useState(0);
  const [itemCount, setItemCount] = useState(1000);
  const [itemPrice, setItemPrice] = useState(0);
  const dispatch = useDispatch();
  const [isCountLimit, setIsCountLimit] = useState("");
  const cart = useSelector((state) => state.cart.cartItems);

  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);

  const handleChange = (e) => {
    let plans = { user: res.token.user.pk, plan_type: e.target.value };

    setIsCountLimit("");

    setSubscription(e.target.value);
    setType(e.target.value);

    if (e.target.value === 1) {
      setType("days");
    } else {
      setType("hits");
    }

    if (e.target.value == "days") {
      setItemCount(7);
    } else {
      setItemCount(1000);
    }

    dispatch(loadingStart());
    ApiRequest.request(CART_STANDARD_PRICE, "POST", plans)
      .then((res) => {
        setBase(res.data[0].base_price);
      })
      .catch((error) => {})
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  const productInfo = {
    user: res.token.user.pk,
    widget: toolId,
    plan_type: type,
    plan_value: itemCount,
    price: itemPrice,
    currency: "$",
    name: toolName,
  };
  const handleAddCart = async () => {
    dispatch(addToCart(productInfo));
    onClose();
  };

  const handleCalculatePrice = (e) => {
    // debugger;
    if (e.target.value <= 0) {
      var ItemCount = 1;
      setIsCountLimit(ErrorMessages.MINIMUM_COUNT);
    } else if (e.target.value > 999 && type === "days") {
      var ItemCount = 999;
      setIsCountLimit(ErrorMessages.Maxium_days_addToCart);
    } else if (e.target.value > 100000 && type === "hits") {
      var ItemCount = 100000;
      setIsCountLimit(ErrorMessages.Maxium_hits_addToCart);
    } else {
      var ItemCount = e.target.value;
      setIsCountLimit("");
    }

    let value = ItemCount * base;
    setItemPrice(value);
    setItemCount(ItemCount);
    // if (e.target.value <= 0) {
    //   setItemCount(0);
    // }
    // if (e.target.value >= 2500000) {
    //   setItemCount("");
    // }
  };

  useEffect(() => {
    if (subscription === "days") {
      setType("days");
      setItemPrice(itemCount * base);
      setItemCount(itemCount);
    } else {
      setType("hits");
      setBase(0.1);
      setItemPrice(itemCount * base);
      setItemCount(itemCount);
    }
  }, [handleChange, subscription, type, itemPrice, base]);

  return (
    <>
      <div className="subscription-type">
        <div className="select-box">
          <select onChange={handleChange} defaultValue="hits">
            <option value="days">Number of days</option>
            <option value="hits" selected>
              Number of hits
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
              value={itemCount}
              // onBlur={(e) => handleBlur(e, "email")}
              onChange={handleCalculatePrice}
            />
            <div className="subscription-type__text">{type}</div>
          </div>
          <div className="subscription-type__amount  subscription-type__amount-text ">
          {cart[0]?.currency}{itemPrice.toFixed(2)}
          </div>
        </div>
        <div className="validated-error">
          {isCountLimit}
          {isCountLimit && itemCount > 1 ? (
            <span>
              <a href="mailto:support-engame@e2eresearch.com"> email us </a> for
              help
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="popup-container__footer">
        <CustomButton
          className="primary-button add--card"
          onClick={handleAddCart}
          disabled={itemCount === 0 || itemCount === "" ? true : false}
        >
          <ShoppingCartIcon className="hover-effect" /> Add to Cart
        </CustomButton>
      </div>
    </>
  );
};

export default SubscriptionType;
