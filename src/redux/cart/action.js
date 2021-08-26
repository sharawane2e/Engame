import * as actionTypes from "./types";
import axios from "axios";
import { BASE_URL } from "../../config/ApiUrl";
let auth = localStorage.getItem("auth");
let res = JSON.parse(auth);

export const removeFromCart = (productId) => async (dispatch, getState) => {
  const { data } = await axios.delete(BASE_URL + `cart/detail/${productId}`, {
    headers: { Authorization: `Bearer ${res.token.access_token}` },
  });
  dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: productId });
};
