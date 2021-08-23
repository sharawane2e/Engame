import * as actionTypes from "./types";
import axios from "axios";
import { BASE_URL } from "../../config/ApiUrl";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
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

  const user = {
    user: res.token.user.pk,
    widget: productId,
    plan_type: "hits",
    plan_value: "2700",
    price: 110,
    currency: "$",
  };
  fetch(BASE_URL + "cart/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${res.token.access_token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
};

// GET ITEM FROM CART

export const getItemFromCart = () => async (dispatch) => {
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  const { data } = await axios.get(BASE_URL + "cart/", {
    headers: { Authorization: `Bearer ${res.token.access_token}` },
  });
  dispatch({ type: actionTypes.GET_CART_ITEM, payload: data });
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
