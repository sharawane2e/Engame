import * as actionTypes from "./types";
import axios from "axios";
import { BASE_URL } from "../../config/ApiUrl";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${BASE_URL}widget/detail/${productId}/`);
  dispatch({
    type: actionTypes.CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.imgUrl,
      widgetType: data.widget_type,
      price: data.price,
      currency: data.currency,
      product: data.id,
      qty: 1,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
