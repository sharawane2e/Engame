import * as actionTypes from "./types";
import axios from "axios";
import { BASE_URL } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";

export const addToCart = (userData) => async (dispatch) => {
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  await fetch(BASE_URL + "cart/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${res.token.access_token}`,
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch({ type: actionTypes.CART_ADD_ITEM, payload: result });
    });
};

export const getItemFromCart = () => async (dispatch) => {
  dispatch(loadingStart());
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  const { data } = await axios.get(BASE_URL + "cart/", {
    headers: { Authorization: `Bearer ${res.token.access_token}` },
  });
  dispatch(loadingStop());
  dispatch({ type: actionTypes.CART_ITEM_GET, payload: data });
};

export const updateCartIteam = () => async (dispatch) => {
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  await fetch(BASE_URL + `cart/detail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${res.token.access_token}`,
    },
    body: JSON.stringify(),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch({ type: actionTypes.CART_ADD_ITEM, payload: result });
    });
};

export const removeFromCart = (productId) => async (dispatch) => {
  dispatch(loadingStart());
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  const { data } = await axios.delete(BASE_URL + `cart/detail/${productId}`, {
    headers: { Authorization: `Bearer ${res.token.access_token}` },
  });
  // console.log("action data will we show", data);
  dispatch(loadingStop());
  dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: productId });
};
