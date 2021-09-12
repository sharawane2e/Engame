import * as actionTypes from "./types";
import axios from "axios";  
import { BASE_URL } from "../../config/ApiUrl";
 let auth = localStorage.getItem("auth");
 let res = JSON.parse(auth);


// export const removeFromCart = (productId) => async (dispatch, getState) => {
//   const { data } = await axios.delete(BASE_URL + `cart/detail/${productId}`, {
//     headers: { Authorization: `Bearer ${res.token.access_token}` },
//   });
//   dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: productId });
// };


export const addToCart = (userData, qty) => async (dispatch, getState) => {
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
  let auth = localStorage.getItem("auth");
  let res = JSON.parse(auth);
  const { data } = await axios.get(BASE_URL + "cart/", {
    headers: { Authorization: `Bearer ${res.token.access_token}` },
  });
  dispatch({ type: actionTypes.GET_CART_ITEM, payload: data });
};

export const removeFromCart = (productId) => async (dispatch,getState) => {
  const { data } = await axios.delete(BASE_URL + `cart/detail/${productId}`, {
    headers: { Authorization: `Bearer ${res.token.access_token}` },
  });
  console.log("action data will we show",data)
  dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: productId });
};

